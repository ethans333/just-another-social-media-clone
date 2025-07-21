# Notes

## ASGI

This is an acronym that stands for _Asynchronous Server Gateway Interface_. It's a python standard interface between web servers and python web applications or frameworks (Django, Flask). Designed to support both synchronous (blocking) and asynchronous (async/await) code.

## ASGI Adapter

An ASGI adapter is a piece of software that wraps a web server application (Django, Flask) so it can run inside an environment that expects ASGI-compatible calls.

## Django

### Apps

Apps are small pieces of your project that make up the entire website.

Typically include:

- Models
- Views
- URLs

An example would be having an app that contains all your information and logic about your users and a similar one for posts.

Separates logic.

### Views

Functions that in charge of processing user requests based on some url or endpoint.

Two types:

- Function based views
- Class based views

### Url Routing

Url patterns are created in order to attach different paths to a view.

### Models

Class based representations of the data in the tables of a database.

### Folder Structure

Outer `myproject/`: The project root directory. The container folder.
Inner `myproject/`: The main django project app.
Inner `api/`: The api app.

Remember, apps are small components of your backend that make the actual website.

### Serializer

A serializer converts models into a json object.

Translator between your database and the outside world.

### View Set

Defines logic for handling requests in one class. It handles CRUD operations for a model in once place.
