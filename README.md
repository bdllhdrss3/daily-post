**Table of content**

 1. API documentation 
 2. Installation

## **API DOCUMENTATION**


SYSTEM REQUIREMENTS


- basic information for a user profile  
- posts are public unless marked private  
- only the original poster can see their own private posts  
- private posts can be made public if the user wishes  
- an authenticated user can create a post. A post has a title, body, metadata and tags  
- when a user deletes a post, it can be retrieved if the user makes a request before 24 hours elapse  
- A post can have an image or set of images  
- A user can post a disappearing message that "disappears" after a configurable amount of time.

 
***hosted  application on render free tier(takes long to load first time)***
https://daily-qgpt.onrender.com/
## AUTHENTICATION
CREATE ACCOUNT:


API: < host >/users/signup

e.g https://daily-qgpt.onrender.com/users/signup

**POST**

body:

    {
    	"email":"abc@ssk.com",
    	"password":  "12355",
    	"gender":  "MALE",
    	"name":  "Kalule"
    }

allows user create acount with basic info such as name email gender and password

Ok response

    {
    	"success":  true,
    	"message":  "User created successfully, proceed to dwonload"
    }
incase email exists

    {"success":false,"message":"Email is already in use"}

LOGIN

API: < host >/users/users/login

e.g https://daily-qgpt.onrender.com/users/login

**POST**

To login user use this endpoint

body

    {
    	"email":"abc@ssk1.com",
    	"password":  "12355"
    }

OK response

    {
    	"success":  true,
    	"message":  "Login successful",
    	"token":  "eyJhbGciOiJIUzI1NiIsInR5c....."
    }
returns user token to use in subsequent requests
if user already exist

    {
    	"success":  false,
    	"message":  "User not found"
    }
invalid password reponse

    {
    	"success":  false,
    	"message":  "Invalid password"
    }




## NOTE : ALL FOLLWOING ENDPOINTS REQUIRE A BEARER TOKEN FROM LOGIN ATTACHED



**TO GET ALL USERS IN APP**

API: < host >/users/users/users

e.g https://daily-qgpt.onrender.com/users/users


**GET**

Response

    {
    	"data": [
    			{
    				"id":  1,
    				"name":  "Kalule",
    				"email":  "abc@ssk.com",
    				"gender":  "MALE"
    			},
    	]
    }

## POSTS

CREATING A POST

API: < host >/users/posts

e.g https://daily-qgpt.onrender.com/posts

**POST**

BODY

    {
    	"title": "food",
    	"body": "Lorem ipsum",
    	"tags": [],
    	"images": [] // image files,
    	"isPrivate": false/true,
    	"ttl": 2
    }

this creates a post 

 - title: title of  a post body: content of post
 -  tags: list of tags of the post 
 -  images: list of blob objects of images on a post.it can be empty. 
 - isPrivate: shows if post is private or public 
 - ttl (time to live): shows the number of minutes a post will be up before deletion, if set to null then the post is not a disappearing   post. the post is automatically deleted by a cron job if it expires..
 
**Response**

    {
	    "id":  34,
	    "userId":  6,
	    "title":  "man u",
	    "body":  "halooaoaoa",
	    "tags":  [
		    "kaka"
	    ],
	    "imageUrls":  [
		    "http://res.cloudinary.com/business-online/image/upload/v1706450959/who7ekqmftlcu6aoyfvm.png",
		    "http://res.cloudinary.com/business-online/image/upload/v1706450961/fzclcofu7csqrp8p3um8.png"
	    ],
	    "isPrivate":  true,
	    "ttl":  "2024-01-28T14:12:21.391Z",
	    "updatedAt":  "2024-01-28T14:09:21.394Z",
	    "createdAt":  "2024-01-28T14:09:21.394Z",
	    "deletedAt":  null
    }
ttl:  shows when post will expire
deletedAt : shows when post was deleted(soft delete) else its null

GET POSTS

API: < host >/users/posts

e.g https://daily-qgpt.onrender.com/posts

**GET**

this gets all posts excluding private posts which dont belong to you.

Response

    {
	    "posts":  [
		    {
		    "id":  35,
		    "title":  "man u",
		    "body":  "halooaoaoa",
		    "tags":  ["kaka"],
		    "imageUrls":  [
			    "http://res.cloudinary.com/business-online/image/upload/v1706451110/dkirkzqhqcgimejdd0yz.png",
			    "http://res.cloudinary.com/business-online/image/upload/v1706451112/uqvtp9qklnyugotgqjc2.png"
		    ],
		    "isPrivate":  true,
		    "userId":  6,
		    "deletedAt":  null,
		    "ttl":  "2024-01-28T14:14:52.137Z",
		    "createdAt":  "2024-01-28T14:11:52.138Z",
		    "updatedAt":  "2024-01-28T14:11:52.138Z",
		    "user":  {
			    "id":  6,
			    "name":  "jan",
			    "email":  "abc@ssk.com"
			    "gender":  "MALE"
		    }
		    },
	    ]
    }


GETTING YOU OWN POSTS

API: < host >/users/posts

e.g https://daily-qgpt.onrender.com/posts

**GET**

this gets all your posts including private posts and soft deleted posts 

    {
        "posts":  [
    	    {
    	    "id":  35,
    	    "title":  "man u",
    	    "body":  "halooaoaoa",
    	    "tags":  ["kaka"],
    	    "imageUrls":  [
    		    "http://res.cloudinary.com/business-online/image/upload/v1706451110/dkirkzqhqcgimejdd0yz.png",
    		    "http://res.cloudinary.com/business-online/image/upload/v1706451112/uqvtp9qklnyugotgqjc2.png"
    	    ],
    	    "isPrivate":  true,
    	    "userId":  6,
    	    "deletedAt":  null,
    	    "ttl":  "2024-01-28T14:14:52.137Z",
    	    "createdAt":  "2024-01-28T14:11:52.138Z",
    	    "updatedAt":  "2024-01-28T14:11:52.138Z",
    	    "user":  {
    		    "id":  6,
    		    "name":  "jan",
    		    "email":  "abc@ssk.com"
    		    "gender":  "MALE"
    	    }
    	    },
        ]
    }


DELETING OWN POST


API: < host >/users/posts/:post:id

e.g https://daily-qgpt.onrender.com/posts/3

**DELETE**


Response

    {
    	"message":  "post deleted succesfully"
    }

Deleting a message softs delete it then after 24 hours it is permanently deleted.
also calling this endpoint twice on same id pemanently deletes it

if you dont won the post or post doesnt exist

    {
	    "message":  "Post not found or you are not authorized to delete this post.",
	    "error":  "Not Found",
	    "statusCode":  404
    }


UPDATING PRIVACY OF YOUR POST

API: < host >/users/posts/togglePrivacy/:post:id

e.g https://daily-qgpt.onrender.com/posts/togglePrivacy/4

**PATCH**


This changes post privacy to public and vice versa.

Response of new post state

    {
	    "id":  4,
	    "title":  "man u",
	    "body":  "halooaoaoa",
	    "tags":  [],
	    "imageUrls":  [],
	    "isPrivate":  true,
	    "userId":  2,
	    "deletedAt":  null,
	    "ttl":  null,
	    "createdAt":  "2024-01-28T14:41:15.960Z",
	    "updatedAt":  "2024-01-28T14:43:05.438Z"
    }

if you try editing non existing post or post you dont own you get error
   

     {
    	    "message":  "Post not found or you are not authorized to update this post.",
    	    "error":  "Not Found",
    	    "statusCode":  404
        }



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
