import fs from 'fs'
import sqlite3 from 'sqlite3'
//@ts-ignore
import  parse from 'parse-db-url'
import { initSqlite3 } from './sqlite3'
describe('sqlite3', () => {
    it('init', (done) => {
        var filepath = "/Users/jaxchow/Library/Application%20Support/Sino%20Studio/sino333.db"
        if(!fs.existsSync(filepath)){
            fs.writeFileSync(filepath,"")
        }else{

            const db = new sqlite3.Database(filepath, sqlite3.OPEN_READWRITE, function (err: Error) {
                if (err) {
                    console.log(err)
                }
                db.serialize(function () {
                    db.run("CREATE TABLE lorem (info TEXT)");

                })
                done()
            })
        }

    })
    it('create', (done) => {
      
        var db = new sqlite3.Database('file://Users/jaxchow/sqlite1.db',sqlite3.OPEN_CREATE);
        // done()

        db.serialize(function () {
            db.run("CREATE TABLE lorem (info TEXT)");

            // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
            // for (var i = 0; i < 10; i++) {
            //     stmt.run("Ipsum " + i);
            // }
            // stmt.finalize();

            // db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            //     console.log(row.id + ": " + row.info);
            // });
            done()
        });

        db.close();
    })


    it('parse-db-url',function(done){
       const config = parse("sqlite3:///Users/jaxchow/sino55.db")
       const url =config.database
       if(!fs.existsSync(url)){
            fs.writeFileSync(url,"")
        }
        console.log("url:",url)
       const db= new sqlite3.Database(url,sqlite3.OPEN_READWRITE)
        db.serialize(function () {
            db.run("CREATE TABLE lorem (info TEXT)");

            // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
            // for (var i = 0; i < 10; i++) {
            //     stmt.run("Ipsum " + i);
            // }
            // stmt.finalize();

            // db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            //     console.log(row.id + ": " + row.info);
            // });
            done()
        });

    })
    it('initSqlite',async ()=>{
        await initSqlite3("/Users/jaxchow/sino.db").catch((err)=>console.log(err))
    })
})


