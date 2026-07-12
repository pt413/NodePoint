## Overview

This project is a pipeline builder built with React, React Flow, Zustand, and FastAPI. It allows users to drag and drop nodes onto a canvas, connect them together, submit the pipeline to a backend endpoint, and receive information about the pipeline structure.

The implementation completes the four required parts of the VectorShift frontend technical assessment:

1. Node abstraction
2. Frontend styling
3. Text node logic
4. Backend integration

---

## Tech Stack

### Frontend

* React
* JavaScript
* React Flow
* Zustand
* CSS

### Backend

* Python
* FastAPI
* Pydantic

---

## Features Implemented

### 1. Node Abstraction

A reusable `BaseNode` component was created to reduce duplicated code across different node types.

The shared abstraction supports:

* Node title
* Node description
* Configurable input fields
* Configurable React Flow handles
* Reusable styling
* Node delete action
* Custom children for flexible node layouts

Existing nodes were refactored to use this abstraction:

* Input Node
* Output Node
* LLM Node
* Text Node

Five additional nodes were added to demonstrate the flexibility of the abstraction:

* Filter Node
* Transform Node
* API Node
* Condition Node
* Database Node

---

### 2. Styling

The frontend was styled with a clean and unified design.

Styling improvements include:

* Improved toolbar design
* Styled draggable node buttons
* Consistent node card design
* Better input, select, and textarea styling
* Larger and more user-friendly connection handles
* Styled submit and clear buttons
* Improved canvas usability

---

### 3. Text Node Logic

The Text Node was enhanced with dynamic behavior.

#### Auto-resizing text input

The Text Node textarea grows as the user types more text. It expands up to a maximum height, after which scrolling is enabled inside the textarea.

#### Variable detection

Users can define variables using double curly braces.

Example:

```txt
Hello {{name}}, your booking ID is {{bookingId}}
```

The Text Node detects valid JavaScript variable names inside `{{ }}` and creates corresponding target handles on the left side of the node.

For the example above, the node creates handles for:

```txt
name
bookingId
```

---

### 4. Backend Integration

The Submit button sends the current pipeline data to the FastAPI backend.

The frontend sends:

* Nodes
* Edges

to:

```txt
POST /pipelines/parse
```

The backend calculates:

* Number of nodes
* Number of edges
* Whether the pipeline is a directed acyclic graph

The response format is:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

After receiving the response, the frontend displays the result in a browser alert.

---

## How to Run the Project

### Run Frontend

From the frontend directory:

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

```txt
http://localhost:3000
```

---

### Run Backend

From the backend directory:

```bash
cd backend
uvicorn main:app --reload
```

The backend runs at:

```txt
http://localhost:8000
```

---

## How to Test

1. Start the backend.
2. Start the frontend.
3. Drag nodes from the toolbar onto the canvas.
4. Connect nodes using the handles.
5. Try the Text Node with variables such as:

```txt
Hello {{name}}, your booking ID is {{bookingId}}
```

6. Confirm that variable handles appear on the left side of the Text Node.
7. Click **Submit Pipeline**.
8. Confirm that an alert appears with:

```txt
Number of Nodes
Number of Edges
Is DAG
```

---

## Additional UI Improvements

The implementation also includes a few usability improvements beyond the minimum requirements:

* Delete button for removing individual nodes
* Clear Canvas button for clearing all nodes and edges
* Improved canvas panning and navigation
* Larger connection handles for easier node linking

---

## Build

To create a production build of the frontend:

```bash
cd frontend
npm run build
```

---

## Notes

This project was completed as part of the VectorShift frontend technical assessment.
