var root = require('app-root-path');
var chai = require('chai');
var chaiHttp = require('chai-http');
var Category = require(`${root.path}/model`).Category;
var server = 'http://localhost:8081';
var expect = chai.expect;
var testHelper = require('./test-helper');
chai.should();
chai.use(chaiHttp);

before((done) => {
    testHelper.startServer().then(() => {
        done();
    });
});

describe('Todos', () => {
    const ROOT = "/api";
    beforeEach((done) => {
        testHelper.resetDB(Category).then(() => {
            done();
        });
    });

    describe('[/GET]', () => {
        it('[#1] - It should find an category', (done) => {
            var testCategory = {
                categoryId: 'TODO',
            };
            Category.create(testCategory).then(value => {
                chai.request(server).get(`${ROOT}/todos?category=${value.categoryId}`).send().end((err, response) => {
                    let body = response.body;
                    response.should.have.status(200);
                    body.should.have.property('type');
                    body.should.have.property('data');
                    expect('success').to.equal(body.type);
                    expect('TODO').to.equal(body.data.key);
                    done();
                });
            }).catch(err => {
                throw err;
            });
        });
    });

    describe('[/POST]', () => {
        it('[#1] - It should create an todo', (done) => {
            var testTodo = {
                title: 'Test Todo',
                description: 'test description'
            };

            var testCategory = {
                categoryId: 'testTODO'
            }
            Category.create(testCategory).then(data => {
                chai.request(server).post(`${ROOT}/todos?category=${data.categoryId}`).send(testTodo).end((err, response) => {
                    let body = response.body;
                    response.should.have.status(200);
                    body.should.have.property('type');
                    body.should.have.property('data');
                    expect('success').to.equal(body.type);
                    expect('Test Todo').to.equal(body.data.todos[0].title);
                    done();
                });
            });
        });
    });
});