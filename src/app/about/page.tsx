// Página: Acerca (src/app/about/page.tsx)
// Propósito: información estática sobre la marca. Editar el texto aquí para actualizar la descripción.
import React from "react";
import VideoPlayerLoader from "../componentes/VideoPlayerLoader";
import Section from "../componentes/Section";

// Página: Acerca - src/app/about/page.tsx
// Propósito: Texto histórico de la marca + galería de fotos + video.
// Instrucciones rápidas (comentarios donde cambiar):
// - Texto de la historia: editar el bloque JSX dentro de <Section id="history">.
// - Fotografías: las imágenes se leen desde `/public/imagenes/`. Actualiza el
//   array `photos` más abajo con los nombres de archivo que quieras mostrar.
// - Video: coloque archivos en `/public/videos/` y actualice el prop `srcBase`
//   del componente `VideoPlayerLoader` (ver sección de video más abajo).

export default function AboutPage() {
  // Nota: las imágenes se han removido de esta página. Si más adelante quieres
  // volver a añadir una galería, crea un componente cliente similar a
  // `GalleryClient` y pásale una lista de fotos desde aquí.

  return (
    <main className="relative overflow-hidden">
      {/* Fondo decorativo animado - igual que la página de inicio */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Hero Section - Nuestra misión y valores */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-amber-50 via-white to-red-50">
        <div className="absolute inset-0 bg-[url('/imagenes/slider/1.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 w-full px-8 md:px-12 lg:px-16 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-title font-bold text-red-600 uppercase tracking-wider mb-3">Acerca de nosotros</p>
            <h1 className="text-3xl md:text-4xl font-title font-bold text-gray-900 mb-4 leading-tight">
              Nuestra misión y valores
            </h1>
            <p className="text-base leading-relaxed text-gray-700">
              Nuestra promesa es servir con pasión y dedicación, ofreciendo la auténtica experiencia de la comida casera mexicana, preparada con las recetas tradicionales que han definido nuestra identidad desde el primer día.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-transparent py-16">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <p className="text-base leading-relaxed text-gray-700 text-left">
            En Pollo Feliz nos comprometemos a mantener los más altos estándares de calidad en cada platillo que servimos. 
            Creemos que la excelencia en el servicio y el respeto por nuestros clientes son fundamentales para construir 
            relaciones duraderas y generar confianza con todas nuestras partes interesadas: clientes, colaboradores, proveedores 
            y las comunidades locales donde operamos. Con el firme objetivo de consolidarnos como el restaurante de pollo favorito 
            de la región, trabajamos día a día capacitando a nuestro equipo, operando con total transparencia y practicando una 
            gestión responsable que prioriza la calidad, la frescura de nuestros ingredientes y la satisfacción de cada familia 
            que nos visita.
          </p>
        </div>
      </section>

      {/* Misión Section */}
      <section className="bg-white/50 py-16">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6 text-left">
            Nuestra misión y filosofía
          </h2>
          <p className="text-base leading-relaxed text-gray-700 text-left mb-4">
            Pollo Feliz sigue una sencilla filosofía: dedicar nuestro talento y pasión por la cocina a crear 
            platillos y servicios superiores que contribuyan a una mejor experiencia gastronómica para nuestras 
            comunidades. Para lograr esto, Pollo Feliz establece un alto valor en su gente, sus recetas 
            tradicionales y la calidad de sus ingredientes.
          </p>
          <p className="text-base leading-relaxed text-gray-700 text-left mb-8">
            En Pollo Feliz, nuestra misión es ofrecer alimentos de la más alta calidad, preparados con amor y 
            dedicación, siguiendo recetas tradicionales que han pasado de generación en generación. Nos comprometemos 
            a brindar una experiencia gastronómica excepcional, donde cada cliente se sienta como en casa, disfrutando 
            de sabores auténticos y un servicio cálido que refleja nuestros valores familiares.
          </p>
          
          {/* Team Image */}
          <div className="rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto">
            <img 
              src="/imagenes/platillos/equipo.jpg" 
              alt="Equipo de Pollo Feliz" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="bg-transparent py-16">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6 text-left">
            Los valores que definen el espíritu de Pollo Feliz
          </h2>
          <p className="text-base leading-relaxed text-gray-700 text-left mb-4">
            Pollo Feliz cree que vivir conforme a valores sólidos es la clave de un buen negocio. Es por eso que 
            estos valores fundamentales, junto con un riguroso compromiso con la calidad, son un aspecto clave de 
            cada decisión que toma la empresa.
          </p>
          <p className="text-base leading-relaxed text-gray-700 text-left mb-8">
            Ser la cadena de restaurantes de pollo más reconocida y querida en la región, destacándonos por mantener 
            la autenticidad de nuestras recetas caseras mientras crecemos con responsabilidad. Aspiramos a expandir 
            nuestra presencia, llevando el sabor y la calidez de Pollo Feliz a más familias, convirtiéndonos en la 
            primera opción cuando buscan comida deliciosa, preparada con ingredientes frescos y el cariño que nos 
            caracteriza.
          </p>
          
          {/* Values Image */}
          <div className="rounded-lg overflow-hidden shadow-lg mx-auto" style={{width: '672px', maxWidth: '100%'}}>
            <img 
              src="/imagenes/platillos/perfil.jpg" 
              alt="Valores de Pollo Feliz" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="bg-white/50 py-16">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-title font-bold text-gray-900 mb-6 text-left">
            Nuestra historia
          </h2>
          <p className="text-base leading-relaxed text-gray-700 text-left mb-4">
            Pollo Feliz nació como un pequeño puesto familiar donde se servía pollo asado con recetas heredadas de 
            la abuela. Con el tiempo fuimos ganando vecinos y clientes que valoraron la comida casera, los sabores 
            sencillos y la atención cálida.
          </p>
          <p className="text-base leading-relaxed text-gray-700 text-left">
            Hoy Pollo Feliz es un lugar donde las recetas tradicionales se mezclan con ingredientes locales frescos. 
            Nuestro compromiso sigue siendo el mismo: comida honesta, preparada con cariño, para compartir en familia.
          </p>
        </div>
      </section>

      {/* Galería de fotografías: (eliminada) Si quieres volver a activarla,
          añade aquí un componente cliente con thumbnails y lightbox. */}

      {/* Video introductorio */}
      <Section id="video" title="Video">
        {/* Comentarios sobre el video:
            - Añade tus archivos a /public/videos/ con nombre base (ej: hero.mp4, hero.webm)
            - Cambia `srcBase` por el nombre base del archivo (sin extensión)
            - Cambia `poster` por la ruta de una imagen de póster en /public/ (opcional)
            - Si prefieres incrustar YouTube/iframe, reemplaza el componente VideoPlayerLoader
              por un <iframe> con la URL y atributos adecuados.
        */}

        <div className="mt-6">
          <VideoPlayerLoader srcBase="hero" poster="/imagenes/placeholder.svg" />
        </div>
      </Section>

      {/* Comentario final: Si quieres reorganizar secciones, cambia el orden de los <Section>
          o convierte cada sección en su propio componente bajo /src/app/about/components/ */}
    </main>
  );
}
