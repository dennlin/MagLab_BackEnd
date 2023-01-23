import express from 'express'
import TestController from './test-controller.js';
import readSummaryData, { readOneData } from '../dataRetrieval/readData.js';
import downloadData from '../dataRetrieval/downloadData.js';

const router = express.Router() // get access to express router

const controller = new TestController();

router.route('/allData').get(function (req, res, next) {
   res.json(
      {
         sensor1: {
            id: "uId_1",
            name: "Mag1",
            //datetime: "2021-01-15 00:16:26.544094 UTC",
            lat: 42.280827,
            long: -83.743034,
            pniFileSize: 1028,
         },
         sensor2: {
            id: "uId_2",
            name: "Mag2",
            //datetime: "2021-01-15 00:16:26.544094 UTC",
            lat: 39.904202,
            long: 116.407394,
            pniFileSize: 1500,
         },
         sensor3: {
            id: "uId_3",
            name: "Mag3",
            //datetime: "2021-01-15 00:16:26.544094 UTC",
            lat: 32.715736,
            long: -117.161087,
            pniFileSize: 6854,
         },
         sensor4: {
            id: "uId_4",
            name: "Mag4",
            //datetime: "2021-01-15 00:16:26.544094 UTC",
            lat: 49.282730,
            long: -123.120735,
            pniFileSize: 4961,
         },
         sensor5: {
            id: "uId_5",
            name: "Mag5",
            //datetime: "2021-01-15 00:16:26.544094 UTC",
            lat: 37.871593,
            long: -122.272743,
            pniFileSize: 2000,
         }
      }
   )
})

router.route('/newData').get(function (req, res, next) {
   res.send(readSummaryData());
});

router.route('/magData').get(function (req, res, next) {
   console.log(req.query.sensorId);
   res.send(readOneData(req.query.sensorId));
});

router.route('/downloadData').get(function (req, res, next) {
   res.download(downloadData(req.query.magId, req.query.date)), (err) => {
      if (err) res.status(404).send("Error in downloading data");
   }
});

// router to handle POST /api/echo
router.route('/echo')
   .post(controller.echo);

export default router