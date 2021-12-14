
export function parseJavaError(message: string){
    const lines = message.split("\n")
    // var reg =lines[1].replace("java.sql.SQLException:","")
   return lines[2].trim()
}