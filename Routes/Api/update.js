const route = require('express').Router();
const Table = require('../../models/Table');

const validate = async (id, name, origStart, origEnd, newStart, newEnd) => {

    let arr = [];

    // Just For convienience
    arr=await Table.find({});
   

    let ok = false;

    // First of all the record is Present or Not
    for (let i = 0; i < arr.length; i++) {

        if (id === arr[i].id && name === arr[i].name) {

            // console.log(id, name, "    ", arr[i].id, arr[i].name, "\n\n");
            console.log(origStart);
            console.log(origEnd);
            console.log(arr[i].startTime);
            console.log(arr[i].endTime);

            if ((arr[i].startTime === origStart && origEnd === arr[i].endTime)) {
                console.log("correct");
                ok = true;
            }
        }

    }

    if (!ok) return 2;


    // if the record intervenes with another record 
    for (let i = 0; i < arr.length; i++) {

        // If the current person is involved in any other interview at that time
        if (id === arr[i].id && name === arr[i].name) {

            if (arr[i].startTime === "00:00") arr[i].startTime = "24:00";

            if (arr[i].endTime === "00:00") arr[i].endTime = "24:00";

            if (arr[i].startTime === origStart && arr[i].endTime === origEnd) continue;

            if ((arr[i].endTime >= newStart && newEnd >= arr[i].endTime) || (arr[i].startTime <= newEnd && newStart <= arr[i].startTime)) {
                return false;
            }
        }
    }

    return 1;
};


route.post('/', async (req, res, next) => {

    let name = req.body.name;
    let id = parseInt(req.body.id);
    let oriStart = req.body.origStart;
    let oriEnd = req.body.origEnd;
    let newStart = req.body.newStart;
    let newEnd = req.body.newEnd;
  
    
    const check = await validate(id, name, oriStart, oriEnd, newStart, newEnd);

    if (check === 2) {
        res.render('failure', {
            message: "Sorry Original Timing Details doesnt match with the respected user"
        })
        return;
    }

    if (!check) {
        res.render('failure', {
            message: `Sorry ${name} has another interview scheduled at that time, Try a new Slot`
        });
        return;
    }

    var newInterView = {
        name: name,
        id: id,
        startTime: newStart,
        endTime: newEnd,
    };

    let val = {
        $set: newInterView,
    };

    try {

        Table.updateOne({
                name: name,
                id: id,
                startTime: oriStart,
                endTime: oriEnd
            }, val,

            (err, response) => {

                if (!err)
                    res.render('accepted.ejs', {
                        message: `Interview for ${name} with id ${id} has been updated to ${newStart}`
                    });

            }); // Async is needed else it'll first render the Accepted Page .....

    } catch (err) {
        console.log(err, "\n\nOld Friend\n");
        res.render('failure', {
            message: "Sorry Try again",
        });
    }

});

exports = module.exports = {
    route,
};