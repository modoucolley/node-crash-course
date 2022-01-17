const fs = require('fs');

// reading file

fs.readFile('./docs/blog1.txt', (error, data)=>{ 

    if(error){
        console.log(error);
    }
    console.log(data.toString());

});



// writing files

fs.writeFile('./docs/blog2.txt','Hello Ninja', ()=>{

    console.log('File was written');
})


// directories

//check if the folder already exists

if(!fs.existsSync('./Assets')){
    fs.mkdir('./Assets',(error)=>{

        if(error){
            console.log(error);
        }
        console.log('File created');
    
    })
}


// deleting files