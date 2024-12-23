const {src, dest, watch, series} = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
//Imagenes
const imagemin = require('gulp-imagemin');

async function css (done){
    src('src/scss/app.scss')        // Identificar el archivo
        .pipe(sass())               // Compilar SASS
        .pipe(dest('build/css'));   // Exportarlo o guardarlo en una ubicación 

    done();
}

function cssBuild(done) {
    src('build/css/app.css')        // Identificar el archivo
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(purgecss({
            content: ['index.html']
        }))
        .pipe(dest('build/css'));   // Exportarlo o guardarlo en una ubicación
    done();
}

async function dev (){
    watch('src/scss/**/*.scss', css); // Vigilar los cambios en el archivo
}

async function imagenes(done){
    src('src/img/**/*')             // Archivos de origen
        .pipe(imagemin({            // Optimizar las imagenes
            optimizationLevel: 3    // Nivel de optimización
        })) 
        .pipe(dest('build/img'));   // Carpeta de destino
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.build = series(cssBuild);
exports.default = series(imagenes, css, dev); // Ejecutar todas las tareas en serie