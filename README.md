# Hustlaz

## ToDos - March 3rd

1. App description
1. List functional and non-functional requirements
1. Technology stack
1. Database structure
1. React folder structure
1. Mockup
1. Create issues in kanban board

## Description

Hustlaz is an app where users can browse through a list of postings and purchase items posted by other sellers. Users can also create their own account and add postings of their own that may be viewed and purchased by others.

## Protoypes

### Overview

![](./assets/prototype-1.png)

### Home View (Top Picks / Items Nearby / etc)

![](./assets/prototype-2.png)

### Detail View

![](./assets/prototype-3.png)

### Shop By Category View

![](./assets/prototype-4.png)

### Add A Posting View

![](./assets/prototype-5.png)

## Requirements

### Functional Requirements

- Create/delete/edit/read postings
- Users can sign up and login
- Categorize postings

### Non-Functional Requirements

- Manage postings from a database
- Manage user pool and user authentication Cognito
- Add category table in db and join with posting

### Nice To Have

- Implement chat system with firebase real time db
- Rate users
- Cluster map of sellers/geolocation
- Save postings
- Upload picture files
- Payment method

## Technologies

### Front End

- React
- Material UI
- Material styling (makeStyles)

### Back End

- MySQL/RDS
- Cognito
- API Gateway
- Lambda

### Misc

- Figma (mockup)
- LucidChart (ERD)

### React Folder Structure

```
├── components
│   ├── Component
│   │   ├── SubComponent
│   │   │   ├── SubComponent.test.tsx
│   │   │   ├── index.tsx
│   │   ├──  Component.stories.tsx
│   │   ├──  Component.test.tsx
│   │   ├──  icon.svg
│   │   ├──  index.tsx
│   │   ├──  utils.ts
│   │   ├──  utils.test.ts
```

### Database structure

## MySQL

<img src="./assets/hustlazERD.png" alt="Hustlaz ERD" />

## NoSQL

```
db =
{
  postings: [
    {
      postingId:1
      desc: fdsfds,
      categoryId: [1 ,2 ]
    },
    {...},{...}
  ],
  catgeories: [
    {
      categoryId: 1,
      name: cars
      postId: [
        2,4
      ]
    },
    {...},{...}
  ]
  users: [
    {...},{...},{...}
  ]
}
```
