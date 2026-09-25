function abrirImagen(src,titulo){const v=document.getElementById("visor");document.getElementById("imagenGrande").src=src;document.getElementById("imagenGrande").alt=titulo;document.getElementById("tituloImagen").textContent=titulo;v.classList.add("activo");document.body.style.overflow="hidden"}
function cerrarImagen(){const v=document.getElementById("visor");v.classList.remove("activo");document.getElementById("imagenGrande").src="";document.body.style.overflow=""}
document.addEventListener("keydown",e=>{if(e.key==="Escape")cerrarImagen()});

// Número de WhatsApp del negocio (Bolivia).
const WHATSAPP_NEGOCIO="59172749223";

const formReserva=document.getElementById("formReserva");
if(formReserva){
  formReserva.addEventListener("submit",function(e){
    e.preventDefault();
    const nombre=document.getElementById("nombre").value.trim();
    const telefono=document.getElementById("telefono").value.trim();
    const profesional=document.getElementById("profesional").value;
    const servicio=document.getElementById("servicio").value;
    const fecha=document.getElementById("fecha").value;
    const hora=document.getElementById("hora").value;
    const detalle=document.getElementById("detalle").value.trim();

    const fechaBonita=fecha ? fecha.split("-").reverse().join("/") : "No indicada";
    let mensaje=`Hola, quiero hacer una reserva en Belleza & Estilo.%0A%0A*Nombre:* ${nombre}%0A*Mi WhatsApp:* ${telefono}%0A*Profesional:* ${profesional}%0A*Servicio/corte:* ${servicio}%0A*Fecha:* ${fechaBonita}%0A*Hora:* ${hora}`;
    if(detalle) mensaje+=`%0A*Opinión o detalle:* ${detalle}`;
    mensaje+=`%0A%0AQuedo atento/a a la confirmación. ¡Gracias!`;

    window.open(`https://wa.me/${WHATSAPP_NEGOCIO}?text=${mensaje}`,"_blank");
  });
}
