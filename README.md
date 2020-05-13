# admin-frontEnd-dev

git status</br>
git add .</br>
git status</br>
git commit -m "erp v0"</br>
git remote add origin https://github.com/macc-academico/admin-frontEnd-dev.git</br>
git push -u origin master</br>

# cli angular

ng g s erp/utils/services/shared/setting --spec=false // generar servicios</br>

# Clonando repositorio

---git config user</br>
git config --global user.name "maagan"</br>
---git config email</br>
git config --global user.email maagansuarez9407@gmail.com</br>

---para clonar un repositorio</br>
`git clone` [repositorio](https://github.com/macc-academico/admin-frontEnd-dev.git)</br>

--para agregar contribuidor nos dirigimos a setting luego a member y asigamos maintainer</br>

---

    	git status
    	git add .
    	git status
    	git commit -m "commit2"
    	git push origin master

# Clonando repositorio

--
git remote -v</br>
git remote add origin https://gitlab.com/macc001/angular-desde-cero.git </br>
git remote -v

origin https://gitlab.com/macc001/angular-desde-cero.git (fetch)</br>
origin https://gitlab.com/macc001/angular-desde-cero.git (push)

# Angulardesdecero

---cuando se clona de git, ejecutamos el siguiente comando
para instalar los paquetes de node_modules</br>
npm install

---crear un proyecto en angular</br>
ng new nombredel_proyecto

---para habrir en un puerto especifico</br>
ng serve -o --port 5000

## Development server

Run `ng serve` Navigate to `http://localhost:4200/`.</br>
Run `ng serve -o --port 4300` Navigate to `http://localhost:4300/`.

## CONFIGURACION ARCHIVO TSLINT

--------- editar al archivo tslint</br>
"quotemark": [false, "single"]</br>
para que me acepte `comilla doble`

"no-inferrable-types": [false, "ignore-params"]</br>
para que acepte esto `recordarme: boolean = false;`

"object-literal-key-quotes": [false, "as-needed"],</br>
para que acepte la peticion de cabezera

"max-line-length": [false, 140],</br>
maximo de linea para el token</br>

--------- agregar al archivo tslint</br>
"no-string-literal": false</br>
para que me acepte atributos de la respuesta a una base de datos esto `resp["ok"]`

"variable-name": [false, "check-format", "allow-leading-underscore"]</br>
nombre de variable para que acepte "id_producto"

## sweet alert

npm install --save sweetalert2

instalamos `npm install alertifyjs --save` y agregamos el css

## sweet alertify

<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.11.3/build/alertify.min.js"></script>

## socket Io

https://www.npmjs.com/package/ngx-socket-io `npm install ngx-socket-io`
pasos
app.module ts
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "src/environments/environment";
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

## redes neuronales

`import * as brain from 'src/assets/js/Brain';`

"align": [false, "parameters", "statements"]

## comandos angular

ng g c erp/modules/gest-comercio/almacen/registro-almac --spec=false --flat

## google maps

npm install @agm/core</br>

## git ignore

node_modules/</br>
src/</br>
e2e/</br>
.gitignore</br>

## APLICANDO REDUX

sitio web `https://ngrx.io/guide/store/install`</br>
instalacion `npm install @ngrx/store --save`

# herramienta para redux

sitio web `https://ngrx.io/guide/store-devtools/install`</br>
instalacion `npm install @ngrx/store-devtools --save`

# instalando effects REDUX

sitio web `https://ngrx.io/guide/effects/install`</br>
instalacion `npm install @ngrx/effects --save`

<hr>

## ------------------GIT-----------------------------

# tutorial para escribir en readme

tutorial readme [pagina oficial](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax#section-links).</br>

agregar colaboradores en git [pagina oficial](https://help.github.com/es/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository).</br>

# credenciales en windows

muestra todos los credenciales, abrimos cmd y colocamos el siguiente comando</br>
`rundll32.exe keymgr.dll,KRShowKeyMgr`</br>
credenciales en windows [pagina oficial](https://protegermipc.net/2018/12/05/eliminar-credenciales-del-almacen-de-windows/).</br>

# clonar repositorio

`git clone url`</br>

# comandos GitHub

mostrar lista de usuarios de git `git config --global --list`</br>
editar user en git `git config --global user.name "aqui-nombre"`</br>
editar user en git `git config --global user.email "aqui-email"`</br>

# git log

muestra los commit realizados con su key</br>
`git log --oneline`</br>

# git pull

sincronizar archivos, cuando creo un archivo en git desde la pagina y no lo tengo de manera local entonces utilizamos el comando</br>
`git pull`</br>

# git fetch

realiza una comparacion de archivo local y servidor, si existiera diferencia, pedira realizar un git pull, para realizar un math</br>
`git fetch`</br>

# git tag

crear una version de nuestro proyecto en git</br>
`git tag v 1.0.0 -m "esta es nuetra primera version"`</br>
`git push --tags`</br>

# RAMAS EN GIT PARA TRABAR EN EQUIPO

## crear una rama

muestra todas las ramas que existen `git branch`</br>
creamos una rama `git branch nombre-rama`</br>
movernos a la rama `git checkout nombre-rama` </br>
eliminar una rama `git branch -d nombre-rama`</br>

## unir las rama "estar posicionado en la rama master"

unir las ramas `git merge nombre-rama`</br>

## LIBRERIA DETECTAR TIPO DE DISPOSITIVOS

            npm install ngx-device-detector --save
            https://www.npmjs.com/package/ngx-device-detector
            https://koderlabs.github.io/ngx-device-detector/demo/

## LIBRERIA BOOTSTRAP SELECT PARA ANGULAR

        https://developer.snapappointments.com/bootstrap-select/examples/
        https://developer.snapappointments.com/bootstrap-select/
        pasos que se realizo aqui, (esos dos estilos se pego en index.html)
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css"
            />

            <!-- Latest compiled and minified JavaScript -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>

## descargas archivos pdf y exel

npm install file-saver
`https://www.npmjs.com/package/file-saver`
