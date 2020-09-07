const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);
describe('functional - pet', () => {

    it('should fail to create a pet without a name', async () => {
        const res = await request(app).post('/pet').send({
            age: 6,
            colour: "black"
        });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"name" is required');
    });

    it('should create a pet', async () => {
        await createPet({
            name: 'Cat',
            age: 6,
            colour: "black"
        });
    });

    it('should get a pet data', async () => {
        const { _id, name, age, colour } = await createPet({
            name: 'Horse',
            age: 6,
            colour: "black"
        });

        const response = await request(app).get(`/pet/${_id}`);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(name);
        expect(response.body.age).to.equal(age);
        expect(response.body.colour).to.equal(colour);
    });

    it('should delete a pet data', async () => {
        const { _id } = await createPet({
            name: 'Rabbit',
            age: 6,
            colour: "white"
        });
        const response = await request(app).delete(`/pet/${_id}`);
        expect(response.status).to.equal(200);
    });

    it('should update a pet data', async () => {
        const { _id } = await createPet({
            name: 'squirrel',
            age: 6,
            colour: "gray"
        });

        const updatedData = {
            name: 'sheep',
            age: 6,
            colour: "yellow"
        };
        const updatedRes = await request(app).put(`/pet/${_id}`).send(updatedData);
        expect(updatedRes.status).to.equal(200);

        const response = await request(app).get(`/pet/${_id}`);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(updatedData.name);
        expect(response.body.age).to.equal(updatedData.age);
        expect(response.body.colour).to.equal(updatedData.colour);
    });



    it('should fail while updating a pet with wrong datatype of age', async () => {
        const { _id } = await createPet({
            name: 'squirrel',
            age: 6,
            colour: "gray"
        });

        const updatedData = {
            name: 'sheep',
            age: "nine",
        };
        const updatedRes = await request(app).put(`/pet/${_id}`).send(updatedData);
        expect(updatedRes.status).to.equal(400);
        expect(updatedRes.body.message).to.equal('"age" must be a number');
    });

});


async function createPet(params) {
    const res = await request(app).post('/pet').send(params);
    expect(res.status).to.equal(201);

    expect(res.body.name).to.equal(params.name);
    expect(res.body.age).to.equal(params.age);
    expect(res.body.colour).to.equal(params.colour);
    return res.body;
}