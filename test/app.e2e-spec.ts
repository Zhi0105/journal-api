import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '@src/prisma/prisma.service'
import * as pactum from 'pactum'
import { RegisterDto, LoginDto } from '@src/auth/dto'
import { UpdateUserDto } from '@src/user/dto'
import { CreateCategoryDto, EditCategoryDto } from '@src/category/dto'
import { CreateTaskDto, EditTaskDto, GetTaskByCategory } from '@src/task/dto'

describe('App e2e', () => { 
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app  = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  })
    
  afterAll(() => {
    app.close()
  })

  
  describe('Auth', () => {
    const signup: RegisterDto = {
      email: 'test@email.com',
      username: 'test',
      password: 'asd'
    }
    const signin: LoginDto = {
      email: 'test@email.com',
      password: 'asd'
    }
    describe('Signup', () => {

      it('should throw an error if email is empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
          ).withBody({
            userame: signup.username,
            password: signup.password
          })
          .expectStatus(400)
      })
      it('should throw an error if username is empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
          ).withBody({
            email: signup.email,
            password: signup.password
          })
          .expectStatus(400)
      })
      it('should throw an error if password is empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
          ).withBody({
            userame: signup.username,
            email: signup.email,
          })
          .expectStatus(400)
      })
      it('should throw an error if no body provided', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
          )
          .expectStatus(400)
      })
      it('should sign up', () => {
        return pactum
        .spec()
        .post(
          '/auth/signup'
          ).withBody(signup)
          .expectStatus(201)
      })
    })
    
    describe('Signin', () => {

      it('should throw an error if email is empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
          ).withBody({
            password: signup.password
          })
          .expectStatus(400)
      })
      it('should throw an error if password is empty', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
          ).withBody({
            email: signup.email,
          })
          .expectStatus(400)
      })
      it('should throw an error if no body provided', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
          )
          .expectStatus(400)
      })
      it('should sign in', () => {
        return pactum
        .spec()
        .post(
          '/auth/signin'
        ).withBody(signin)
        .expectStatus(201)
        .stores('userAt', 'access_token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user information', () => {
        return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
      })
    })
    describe('Update user', () => {
      it('should update user', () => {
        const dto: UpdateUserDto = {
          email: 'sample@email.com',
          username: 'sample',
        }
        return pactum
        .spec()
        .patch('/users/update')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
      })
    })
  })

  describe('Category', () => {

    describe('Get empty category', () => {
      it('should get category', () => {
        return pactum
        .spec()
        .get('/category/all')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .expectBody([])
      })
    })
    describe('Create category', () => {
      it('should create category', () => {
        const dto: CreateCategoryDto = {
          title: "test category"
        }
        return pactum
        .spec()
        .post('/category/create')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('category_id', 'id')
      })
    })
    describe('Get category', () => {
      it('should get category', () => {
        return pactum
        .spec()
        .get('/category/all')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .expectJsonLength(1)
      })
    })
    describe('Get category by id', () => {
      it('should get category by id', () => {
        return pactum
        .spec()
        .get('/category/{id}')
        .withPathParams('id', '$S{category_id}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .expectBodyContains('$S{category_id}')
      })
    })
    describe('Update category by id', () => {
      it('should update category by id', () => {
        const dto: EditCategoryDto = {
            title: "new category name"
        }
        return pactum
        .spec()
        .patch('/category/{id}')
        .withPathParams('id', '$S{category_id}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.title)
      })
    })

  })

  describe('Task', () => {
    describe('Get empty task', () => {
      it('should get task', () => {
        return pactum
        .spec()
        .get('/task/all')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .expectBody([])
      })
    })
    describe('Create task', () => {
      it('should create task', async() => {
        const category = await prisma.category.findFirst()
        const dto: CreateTaskDto = {
          name: "test task",
          description: "test description",
          start_date: new Date(),
          end_date: new Date(),
          category_id: category.id
        }
        return pactum
        .spec()
        .post('/task/create')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('task_id', 'id')
        .inspect()
      })
    })
    describe('Get task', () => {
     
      it('should get task by user', () => {
        return pactum
        .spec()
        .get('/task/all')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .expectJsonLength(1)
      })
      it('should get task by user with specific category', async() => {
        const category = await prisma.category.findFirst()
        const dto: GetTaskByCategory = {
          category_id: category.id
        }
        return pactum
        .spec()
        .get('/task/category')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
        .expectJsonLength(1)
      })
    })
    describe('Get task by id', () => {
      it('should get task by id', () => {
        return pactum
        .spec()
        .get('/task/{id}')
        .withPathParams('id', '$S{task_id}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200)
        .expectBodyContains('$S{task_id}')
      })
    })
    describe('Update task by id', () => {
      it('should update task by id', async() => {
        const category = await prisma.category.findFirst()
        const dto: EditTaskDto = {
          name: "new task name",
          description: "updated description",
          status: "updated status",
          start_date: new Date(),
          end_date: new Date(),
          category_id: category.id
        }
        return pactum
        .spec()
        .patch('/task/{id}')
        .withPathParams('id', '$S{task_id}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.name)
      })
    })
  })

  describe('Delete models', () => {
    describe('Delete task by id', () => {
      it('should delete task by id', () => {
        return pactum
        .spec()
        .delete('/task/{id}')
        .withPathParams('id', '$S{task_id}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(204)
      })
      it('should get empty task', () => {
          return pactum
          .spec()
          .get('/task/all')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(0)
      })
    })
    describe('Delete category by id', () => {
      it('should delete category by id', () => {
        return pactum
        .spec()
        .delete('/category/{id}')
        .withPathParams('id', '$S{category_id}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(204)
      })

      it('should get empty category', () => {
          return pactum
          .spec()
          .get('/category/all')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(0)
      })
    })
  })
  
})

