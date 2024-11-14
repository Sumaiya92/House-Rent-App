import express from 'express';
import { getAllOwners, getAllProperties, getAllRenters, ownerAction } from '../controllers/adminController.js';
// import logger from '../utils/logger.js';

const router = express.Router();

router.get('/all-owners', async (req, res, next) => {
  try {
    const owners = await getAllOwners();
    logger.info('Retrieved all owners');
    res.json(owners);
  } catch (error) {
    logger.error('Error retrieving all owners', error);router.get('/all-owners', async (req, res, next) => {
  try {
    logger.info('Retrieving all owners');
    const owners = await getAllOwners();
    logger.info('Retrieved all owners');
    res.json(owners);
  } catch (error) {
    logger.error('Error retrieving all owners', error);
    next(error);
  }
});

router.get('/all-properties', async (req, res, next) => {
  try {
    logger.info('Retrieving all properties');
    const properties = await getAllProperties();
    logger.info('Retrieved all properties');
    res.json(properties);
  } catch (error) {
    logger.error('Error retrieving all properties', error);
    next(error);
  }
});

router.get('/all-renters', async (req, res, next) => {
  try {
    logger.info('Retrieving all renters');
    const renters = await getAllRenters();
    logger.info('Retrieved all renters');
    res.json(renters);
  } catch (error) {
    logger.error('Error retrieving all renters', error);
    next(error);
  }
});

router.post('/owner-action', async (req, res, next) => {
  try {
    logger.info('Performing owner action');
    const result = await ownerAction(req.body);
    logger.info('Owner action performed successfully');
    res.json(result);
  } catch (error) {
    logger.error('Error performing owner action', error);
    next(error);
  }
});
    next(error);
  }
});

router.get('/all-properties', async (req, res, next) => {
  try {
    const properties = await getAllProperties();
    logger.info('Retrieved all properties');
    res.json(properties);
  } catch (error) {
    logger.error('Error retrieving all properties', error);
    next(error);
  }
});

router.get('/all-renters', async (req, res, next) => {
  try {
    const renters = await getAllRenters();
    logger.info('Retrieved all renters');
    res.json(renters);
  } catch (error) {
    logger.error('Error retrieving all renters', error);
    next(error);
  }
});

router.post('/owner-action', async (req, res, next) => {
  try {
    const result = await ownerAction(req.body);
    logger.info('Owner action performed successfully');
    res.json(result);
  } catch (error) {
    logger.error('Error performing owner action', error);
    next(error);
  }
});

export default router;
