$(document).ready(function(){
    var data;
    var validar = false;
    const v_info={
        url:'http://localhost:3002/service?url=http://34.66.136.41',
        api_key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ1ODY3MzUsImp0aSI6InJHQ3ZISk1KSHFLaExVbEZjUUxSS1ZxYmxDOVJCczdBd3FLTi0wSFpEZzhpV016UkhYUE5oYWFSRlFHYVVleThFQUljeC1JSC1lRkExaGNqIn0.1BWz6BKR1zylSdTjD4dMYFgxUIi-dGctvjF3ORUvunE',
    }
    v_info.ip = window.location.origin;adssad
    
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("data") == 'null' || localStorage.getItem("data") == null){
            data = {traer_etiquetas:{},traer_datasets:{},traer_descripcion_dataset:{}};
        }
        else{
            data = JSON.parse(localStorage.getItem("data"));
            console.log(data)
            validar = true;
        }
    }
    
    if(!validar){
        data.traer_datasets = JSON.parse(peticion(v_info.url+'/api/action/package_list',"","GET",false))
    }
    

    for(i=0;i<data.traer_datasets.result.length;i++){
        if(!validar){
            data.traer_descripcion_dataset[ data.traer_datasets.result[i] ] = JSON.parse(peticion(v_info.url+'/api/action/package_show?id='+data.traer_datasets.result[i],"","GET",false))
            localStorage.setItem("data", JSON.stringify(data));
        }
        
        var url = data.traer_descripcion_dataset[ data.traer_datasets.result[i] ].result.resources[0].url;

        if( url.split('tableau').length > 1 && url.split('view').length > 1 ){
            $(".resource").append('<option value="'+btoa(url.split('views/')[1].split('?')[0])+'">'+url.split('views/')[1].split('?')[0].replace("&#47;","/")+'</option>');
        }

        info = '';
        ;
    }

    $(".resource").change(function(){
        $('.contenedor').html(
            "<div class='tableauPlaceholder' id='viz1605882710419' style='position: relative'>"+
                "<noscript>"+
                    "<a href='#'>"+
                        "<img alt=' 'src='https://storage.googleapis.com/marca/bombilloGL.PNG' style='border: none' />"+
                    "</a>"+
                "</noscript>"+
                "<object class='tableauViz'  style='display:none;'>"+
                    "<param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />"+
                    "<param name='embed_code_version' value='3' />"+
                    "<param name='site_root' value='' />"+
                    "<param name='name' value='"+atob(this.value)+"' />"+
                    "<param name='tabs' value='no' />"+
                    "<param name='toolbar' value='no' />"+
                    "<param name='static_image' value='https://storage.googleapis.com/marca/bombilloGL.PNG' />"+
                    "<param name='animate_transition' value='yes' />"+
                    "<param name='display_static_image' value='yes' />"+
                    "<param name='display_spinner' value='yes' />"+
                    "<param name='display_overlay' value='yes' />"+
                    "<param name='display_count' value='yes' />"+
                    "<param name='language' value='en' />"+
                "</object>"+
            "</div>"+
            "<script type='text/javascript'>"+
                "var divElement = document.getElementById('viz1605882710419');"+
                "var vizElement = divElement.getElementsByTagName('object')[0];"+
                "vizElement.style.width='100%';"+
                "vizElement.style.height='768px';"+
                
                "var scriptElement = document.createElement('script');"+
                "scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';"+
                "vizElement.parentNode.insertBefore(scriptElement, vizElement);"+
            "</script>"
        )
    })
})

function peticion(url,send,metod,async){
    var respuesta = new XMLHttpRequest();
    respuesta.onreadystatechange = function() {};
    respuesta.open(metod, url, async);
    respuesta.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    respuesta.send(send);
    if(respuesta.status == 200 && respuesta.readyState == 4){
        return respuesta.responseText;
    }
    else{
        return 'Error conexión incorrecta detalles: <br><br> '+ respuesta.responseText 
    }
}