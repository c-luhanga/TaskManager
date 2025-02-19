import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Task Management App (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let taskId: number;

  const testUser = {
    username: 'testuser',
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Use built-in validation (if any)
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Authentication', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201)
        .expect(({ body }) => {
          expect(body.message).toBe('User registered successfully');
        });
    });

    it('should not register a duplicate user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(401);
    });

    it('should login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(testUser)
        .expect(201)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          authToken = body.token;
        });
    });

    it('should reject login with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: testUser.username, password: 'wrongpass' })
        .expect(401);
    });
  });

  describe('Tasks Endpoints', () => {
    it('should create a new task', () => {
      const newTask = { title: 'Test Task' };
      return request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTask)
        .expect(201)
        .expect(({ body }) => {
          expect(body.title).toBe('Test Task');
          expect(body.isComplete).toBe(false);
          taskId = body.id;
        });
    });

    it('should get all tasks for the user', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('should update a task', () => {
      return request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ isComplete: true })
        .expect(200)
        .expect(({ body }) => {
          expect(body.isComplete).toBe(true);
        });
    });

    it('should delete a task', () => {
      return request(app.getHttpServer())
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should not access tasks without authentication', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});