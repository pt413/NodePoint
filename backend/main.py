from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None


class PipelineEdge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[PipelineNode]
    edges: List[PipelineEdge]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def check_is_dag(nodes: List[PipelineNode], edges: List[PipelineEdge]) -> bool:
    graph = {node.id: [] for node in nodes}
    visiting = set()
    visited = set()

    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)

    def dfs(node_id: str) -> bool:
        if node_id in visiting:
            return False

        if node_id in visited:
            return True

        visiting.add(node_id)

        for neighbor in graph.get(node_id, []):
            if not dfs(neighbor):
                return False

        visiting.remove(node_id)
        visited.add(node_id)

        return True

    for node in graph:
        if not dfs(node):
            return False

    return True


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    if num_nodes==0 and num_edges==0:
        is_dag = False
    else:
        is_dag = check_is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }