# Planning Document

## Stack Summary

| 🧱 Element     | 🛠️ Technology                  |
| -------------- | ------------------------------ |
| API Gateway    | API Gateway                    |
| API            | Django & Mangum                |
| Frontend       | React                          |
| Database       | PostgreSQL                     |
| File Storage   | S3                             |
| CI/CD Pipeline | AWS Code Pipeline & Code Build |

## Stack Map

```css
                             ┌──────────────────┐
                             │    GitHub Repo   │
                             └────────┬─────────┘
                                      │
                             ┌────────▼─────────┐
                             │ AWS CodePipeline │
                             └────────┬─────────┘
                                      │
                             ┌────────▼─────────┐
                             │  AWS CodeBuild   │
                             └───────┬──────────┘
                                     │
         ┌───────────────────────────┼────────────────────────────┐
         │                           │                            │
 ┌───────▼───────┐         ┌─────────▼────────┐         ┌─────────▼────────┐
 │ React Frontend│         │ Django + Mangum  │         │   Static Files   │
 │ (Built w/Vite)│         │     (ASGI app)   │         │   (images, etc.) │
 └───────┬───────┘         └─────────┬────────┘         └─────────┬────────┘
         │                           │                            │
 ┌───────▼─────────┐       ┌─────────▼────────┐         ┌─────────▼────────┐
 │     S3 Bucket   │◄──────┤   AWS Lambda     ├────────►│     S3 Bucket    │
 │ (Static Hosting)│       └─────────┬────────┘         │ (Media Storage)  │
 └────────┬────────┘                 │                  └──────────────────┘
          │                          │
 ┌────────▼────────┐        ┌────────▼─────────┐
 │ AWS CloudFront  │        │   API Gateway    │
 │ (CDN for S3)    │        │ (Routing, CORS,  │
 └─────────────────┘        │   Security, etc.)│
                            └─────────┬────────┘
                                      │
                            ┌─────────▼────────┐
                            │   Amazon RDS     │
                            │  (PostgreSQL DB) │
                            └──────────────────┘

```

## Stack

### API Gateway

We need **api gateway** to connect the API. It's needed for

- routing requests
- rate limiting
- integration with cognito/IAM
- CORS handling
- monitoring

### API (Django & Mangum)

There's two things you want to use for the API. The actual API infrastructure should be built using **django**. The ASGI wrapper **Mangum**.

**Mangum** is an ASGI wrapper for AWS lambda, it wraps an ASGI app so that Lambda can invoke it correctly. It translates API Gateway events into ASGI requests and translates ASGI responses back into API gateway.

### Frontend (S3 & CloudFront)

The frontend is uploaded and built using vite to produce static HTML files. The files should then exist on and S3 bucket, configured for static web hosting.

The S3 bucket serves your frontend files statically over HTTP. Cloudfront is needed as a CDN, caching and serving your static files world wide, which would otherwise be region specific.

### Database (Amazon RDS)

Amazon RDS is used for full managing databases in the cloud.

### File Storage (S3)

Used for storing static files such as images.

## CI/CD Pipeline (AWS Code Pipeline & Code Build)

### Code Pipeline

A full fledged CI/CD pipeline service for deploying applications.

### Code Build

Used for actually building your code within your CI/CD pipeline.
