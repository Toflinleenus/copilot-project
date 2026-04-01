# Project: Library Management System

## Tech Stack
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- No Lombok

## Architecture
- Follow strict layered architecture:
  Controller → Service → Repository → Entity

## Coding Rules
- Use constructor injection ONLY (no field injection)
- Use ResponseEntity for all API responses
- Use proper HTTP status codes (200, 201, 400, 404, etc.)
- Use Jakarta Validation annotations (@NotNull, @Email, etc.)
- Always handle validation errors using BindingResult

## Naming Conventions
- Controller: BookController, MemberController
- Service: BookService, MemberService
- Repository: BookRepository
- DTO: BookRequestDto, IssueRequestDto

## API Rules
- RESTful endpoints
- Use plural naming (/books, /members)
- Use path variables properly

## Database Rules
- Use JPA annotations properly (@Entity, @Id, @GeneratedValue)
- Maintain relationships (OneToMany, ManyToOne)

## Code Quality
- Clean, readable, production-level code
- Avoid unnecessary comments
- Proper exception handling

## Testing
- Use @WebMvcTest for controllers
- Use MockMvc for API testing
- Use Mockito for mocking services