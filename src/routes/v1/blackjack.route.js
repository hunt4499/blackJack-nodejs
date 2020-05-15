const express = require('express');

const blackJackController = require('../../controllers/blackjack.controller');

const router = express.Router();

router.get('/initiate',blackJackController.initiatePlay);

router.post('/generateHandForPlayer',blackJackController.getCardByPlayerId);

router.post('/playerHistory',blackJackController.getPlayerHistory);

router.post('/drawDealer',blackJackController.drawDealerCard);

router.post('/saveRound',blackJackController.saveRound);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name:  BlackJack
 *   description: BlackJack Implementation
 */

 /**
 * @swagger
 * path:
 *  /blackjack/initiate:
 *    get:
 *      summary: initiate Play
 *      tags: [BlackJack]
 
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/blackjackTokens'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * path:
 *  /blackjack/generateHandForPlayer:
 *    post:
 *      summary: generateHandForPlayer
 *      tags: [BlackJack]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               gameId:
 *                 type: string
 *                 format: gameId
 *                 minLength: 12
 *                 description: At least one number and one letter
 *               playerId:
 *                 type: number
 *                 format: playerId
 *                 minLength: 1
 *                 description: At least one number 

 */

/**
 * @swagger
 * path:
 *  /blackjack/playerHistory:
 *    post:
 *      summary: Get player History
 *      tags: [BlackJack]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               gameId:
 *                 type: string
 *                 format: gameId
 *                 minLength: 12
 *                 description: At least one number and one letter
 *               playerId:
 *                 type: number
 *                 format: playerId
 *                 minLength: 1
 *                 description: At least one number 
 *               example:
 *                playerId: 2            
 *        responses:
 *          "200":
 *              description: OK
 *              content:
 *              application/json:

 */


/**
 * @swagger
 * path:
 *  /blackjack//drawDealer:
 *    post:
 *      summary: Draw Card For Dealer
 *      description: If everything is alright the card for dealer will be fetched
 *      tags: [BlackJack]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            required:
 *                - gameId
 *            properties:
 *              gameId:
 *                type: string
 *                format: gameId
 *                minLength: 12
 *                description: At least one number and one letter
 *            example:
 *                gameId: 5ebe2681a765672e40273d23
 *      responses:
 *        "204":
 *          description: No content
 *        "401":
 *          description: saving round failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: saving round failed
 */

/**
 * @swagger
 * path:
 *  /blackjack/saveRound:
 *    post:
 *      summary:  Save Round
 *      tags: [BlackJack]
 *      parameters:
 *          schema:
 *            type: string
 *          description: Save Round
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gameId
 *              properties:
 *                gameId:
 *                  type: string
 *                  format: gameId
 *                  minLength: 12
 *                  description: At least one number and one letter
 *              example:
 *                gameId: 5ebe2681a765672e40273d23
 *      responses:
 *        "204":
 *          description: No content
 *        "401":
 *          description: saving round failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: saving round failed
 */