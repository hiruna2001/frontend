
import { createClient } from "@supabase/supabase-js";

const anoKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZ3JpdXF3YWxweW90aGJoa2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzODE3MTQsImV4cCI6MjA4Mzk1NzcxNH0.WOw9pZkLg6l5RJbraeGLnklDuM0C_-MW49joesH9uW8"
const supabaseUrl = "https://ikgriuqwalpyothbhkfd.supabase.co"

const supabase = createClient(supabaseUrl, anoKey)

/*
supabase.storage.from('images').upload(file.name, file,{
            upsert:false,
            cacheControl:'3600'
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from('images').getPublicUrl(file.name).data.publicUrl
                console.log(publicUrl);
            }
        )

*/


export default function mediaUpload(file) {
    return new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No File")

            } else {
                const timestamp = new Date().getTime();
                const fileName= timestamp+file.name

                supabase.storage
                .from('images')
                .upload(fileName, file, {
                    upsert: false,
                    cacheControl: '3600'
                }).then(
                    () => {
                        const publicUrl = supabase.storage
                        .from('images')
                        .getPublicUrl(fileName).data.publicUrl
                        resolve(publicUrl);
                    }
                ).catch(
                    (error) => {
                        reject("An Error Occurred")
                    }
                )


            }
        }
    )

}