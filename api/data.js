import { Router } from 'express';
import {getAllData, getDataById, addData, getUsersRecords, generateRandomUser} from '../database.js'
let router = Router()

router.get('/', async (req, res) => {
    res.json( await getAllData() )
})

router.get('/users_records', async (req, res) => {
    res.json( await getUsersRecords())
})

router.get('/:id', async (req, res) => {
    res.json( await getDataById(req.params.id) )
})

router.post('/', async (req, res) => {
    let exist = await getDataById(req.body.id)
    if( exist[0] ) {
        res.status(409).json( {"error": "record already exists"});
    } else {
        let result = await addData(req.body);
        if(result.affectedRows)
            res.json(req.body);
        else
            res.status(500).json({"error": "unknown database error"})
    }
})

router.post('/generate_random_user', async (req, res) => {
    try {
        const { maxUsers } = req.body;
        if (!maxUsers || typeof maxUsers !== 'number' || maxUsers <= 0) {
            return res.status(400).json({ error: 'Invalid maxUsers value. Please provide a positive integer.' });
        }

        const result = await generateRandomUser(maxUsers);
        res.status(201).json({ message: `${maxUsers} random users generated successfully.`, data: result });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate random users.' });
    }
})

export default router;
