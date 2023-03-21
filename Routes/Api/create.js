const route = require('express').Router();
const Table = require('../../models/Table');

// A function to check if required InterView Can be scheduled
async function validate (start, end, id, name) {

    let arr = [];                                     

    if (start === "00:00") start = "24:00";
    if (end === "00:00") end = "24:00";                                 
                                                         // Just For convienience
    arr=await Table.find({});
    
   console.log(arr);
     
    
    for (let i = 0; i < arr.length; i++) {

        // If slot is unavailable
       

            if ((start>=arr[i].startTime && start<=arr[i].endTime)  || (end>=arr[i].startTime &&  end <= arr[i].endTime)) {
                console.log("NO");
                return false;
            }
        
    }
    console.log("YES");
    return true;
}

  route.post('/', async (req, res, next) => {

    
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let id = parseInt(req.body.id);
    let name = req.body.name;

     let check = await validate(startTime, endTime, id, name);   // Remember We didnt put await here and so it was messing up earlier
                                                                // because code below this line was executing before execution of this
    
    if (check === false) {
        res.render('failure', {
            message: `Sorry ${name}, someone is already enrolled in an interview at that time, Please pick some different other Slot!`
        });
        return;
    }

    const newInterView = new Table({
        name: name,
        id: id,
        startTime: startTime,
        endTime: endTime,
    });

    try {
        
        await newInterView.save();                            // Async is needed else it'll first render the Accepted Page ......
        res.render('accepted', {
            message: `Interview for ${name} with id ${id} has been scheduled at ${startTime}`
        });   
    }

    catch (err) {
        res.render('failure', {
            message: err.message,
        })
    }
});

exports = module.exports = {
    route,
}
