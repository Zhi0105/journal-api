import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '@src/prisma/prisma.service'
import * as pactum from 'pactum'
import { RegisterDto, LoginDto } from '@src/auth/dto'

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
    describe('Update user', () => {})
  })

  describe('Category', () => {
    describe('Create category', () => {})
    describe('Get category', () => {})
    describe('Get category by id', () => {})
    describe('Update category by id', () => {})
    describe('Delete category by id', () => {})
  })
  
})

