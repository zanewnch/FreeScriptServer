import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controller/userTemplate';
import { isAuthenticated, isOwner } from './indexForMiddleware';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
