# Research Findings: Physical AI & Humanoid Robotics Textbook Generation

## Decisions and Rationales

### Language and Version Selection

- **Decision**: TypeScript/JavaScript for Docusaurus frontend, Python 3.10+ for RAG backend.
- **Rationale**: Docusaurus is a React-based static site generator, making TypeScript/JavaScript the natural choice for frontend development and customization. Python is widely adopted for AI/ML and offers robust libraries for RAG implementation (FastAPI, Qdrant/Neon client libraries). This bifurcated approach leverages the strengths of each language for their respective domains.
- **Alternatives considered**: Entirely JavaScript-based RAG (e.g., Node.js with embedded vector database) was considered but rejected due to the richer ecosystem and community support for RAG in Python, particularly with readily available libraries and models.

### Primary Dependencies

- **Decision**: Docusaurus, React, FastAPI, Qdrant/Neon.
- **Rationale**: Docusaurus and React form the core of the textbook frontend, providing a robust and extensible platform for content display and UI customization. FastAPI is chosen for the RAG backend due to its high performance, ease of use, and strong typing support, which is beneficial for API development. Qdrant/Neon are selected for the vector database and PostgreSQL storage respectively, based on the constitution's mention of Neon for chunk mapping and their suitability for RAG operations.
- **Alternatives considered**: Other static site generators (e.g., Next.js, Gatsby) were implicitly considered for the frontend but Docusaurus was chosen for its specific focus on documentation and educational content, which aligns well with the textbook nature. Flask or Django were considered for the backend but FastAPI offers better performance and modern features for API-first development. Other vector databases were implicitly considered.

### Storage for RAG Chunk Mapping

- **Decision**: PostgreSQL/Neon for RAG chunk -> source mapping.
- **Rationale**: The project constitution explicitly mentions storing chunk -> source mapping in Postgres/Neon for auditability. PostgreSQL is a reliable and feature-rich relational database, and Neon provides a scalable serverless option, aligning with potential deployment needs.
- **Alternatives considered**: Other relational or NoSQL databases were not explicitly considered as the constitution provides a clear directive.

### Testing Frameworks

- **Decision**: Jest/React Testing Library for frontend, Pytest for backend.
- **Rationale**: Jest is a widely used JavaScript testing framework, and React Testing Library provides utilities for testing React components in a user-centric way. Pytest is a popular and powerful testing framework for Python, suitable for testing the FastAPI backend components. These choices represent standard best practices in their respective ecosystems.
- **Alternatives considered**: Other testing frameworks like Cypress (for E2E) or Mocha/Chai (for JS) and unittest (for Python) were implicitly considered but Jest/React Testing Library and Pytest offer a good balance of features, community support, and ease of integration for this project.

### Project Type and Structure

- **Decision**: Hybrid (Docusaurus web application with dedicated Python/FastAPI backend for RAG).
- **Rationale**: This structure allows for a clear separation of concerns, with the Docusaurus frontend handling content rendering and UI, and the Python backend managing the RAG logic, vector database interactions, and potential Claude integration. This modularity enhances maintainability and scalability, aligning with the project's goal of a high-quality and modular textbook.
- **Alternatives considered**: A monolithic approach where RAG is tightly coupled with the Docusaurus frontend was rejected due to potential complexity in managing two different language ecosystems within a single deployment unit and the benefits of a dedicated, scalable backend for AI services.

### Content Generation Standards

- **Decision**: Adherence to `NN-slug-title.md` filename pattern, UTF-8 Markdown, and chapter quality standards (objectives, explanations, exercises, quizzes, references).
- **Rationale**: These standards, derived directly from the project constitution and feature specification, ensure consistency, discoverability, and high quality of the generated textbook content. They are crucial for a classroom-ready and professional textbook.
- **Alternatives considered**: No alternatives were considered as these are direct requirements.
