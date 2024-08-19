import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { assert } from 'chai';
import axios from 'axios'; // Importa axios para las pruebas de backend

(async function testPage() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        await driver.get('http://localhost:4200'); // Asegúrate de que la URL sea correcta

        // Espera para asegurarse de que la página está completamente cargada
        await driver.sleep(5000); // Espera 5 segundos

        // Obtén el título actual para depurar
        let currentTitle = await driver.getTitle();
        console.log('Current Title:', currentTitle);

        // Espera y verifica el título correcto
        await driver.wait(until.titleIs('Matricula'), 15000); // Espera hasta 15 segundos

        // Verificar el logo
        let logo = await driver.findElement(By.css('img.img2'));
        console.log('Logo displayed:', await logo.isDisplayed());
        assert.isTrue(await logo.isDisplayed(), 'Logo should be displayed');

        // Verificar el contenido de la cabecera
        let headerText = await driver.findElement(By.css('header h1')).getText();
        console.log('Header text:', headerText);
        assert.strictEqual(headerText, 'Sistema de Matrícula Escolar', 'Header text should match');

        // Verificar enlaces en la cabecera
        let youtubeLink = await driver.findElement(By.linkText('Youtube'));
        console.log('YouTube link displayed:', await youtubeLink.isDisplayed());
        assert.isTrue(await youtubeLink.isDisplayed(), 'YouTube link should be visible');

        let cursosLink = await driver.findElement(By.linkText('Cursos'));
        console.log('Cursos link displayed:', await cursosLink.isDisplayed());
        assert.isTrue(await cursosLink.isDisplayed(), 'Cursos link should be visible');

        let contactoLink = await driver.findElement(By.linkText('Contacto'));
        console.log('Contacto link displayed:', await contactoLink.isDisplayed());
        assert.isTrue(await contactoLink.isDisplayed(), 'Contacto link should be visible');

        // Verificar el contenido de la tarjeta de registro
        let registrationCardTitle = await driver.findElement(By.css('.registration-card h3')).getText();
        console.log('Registration card title:', registrationCardTitle);
        assert.strictEqual(registrationCardTitle, 'Matricúlate aquí', 'Registration card title should match');

        let registrationText = await driver.findElement(By.css('.registration-card p.lead')).getText();
        console.log('Registration card text:', registrationText);
        assert.include(registrationText, 'Inscríbete ahora', 'Registration text should include the call to action');

        // Verificar el contenido de la tarjeta de información
        let infoCardTitle = await driver.findElement(By.css('.info-card h3')).getText();
        console.log('Info card title:', infoCardTitle);
        assert.strictEqual(infoCardTitle, '¿Quiénes Somos?', 'Info card title should match');

        let infoCardText = await driver.findElement(By.css('.info-card p.info-text')).getText();
        console.log('Info card text:', infoCardText);
        assert.include(infoCardText, 'Angular University', 'Info card text should include the university name');

        // Verificar el carrusel
        let carouselItems = await driver.findElements(By.css('#carouselExampleIndicators .carousel-item'));
        console.log('Number of carousel items:', carouselItems.length);
        assert.isAtLeast(carouselItems.length, 3, 'Carousel should have at least 3 items');

        let carouselImageSrc = await carouselItems[0].findElement(By.tagName('img')).getAttribute('src');
        console.log('Carousel image source:', carouselImageSrc);
        assert.include(carouselImageSrc, 'edifico2.jpg', 'Carousel image source should match');

        // Verificar la imagen aside
        let asideImage = await driver.findElement(By.css('.img-fluid.mb-4'));
        console.log('Aside image displayed:', await asideImage.isDisplayed());
        assert.isTrue(await asideImage.isDisplayed(), 'Aside image should be displayed');

        // Verificar el footer
        let footerText = await driver.findElement(By.css('footer p')).getText();
        console.log('Footer text:', footerText);
        assert.strictEqual(footerText, '© 2024 AngularUniversity. Todos los derechos reservados.', 'Footer text should match');

        // Hacer clic en el enlace "Usuarios" y esperar a que la página se cargue
        let usuariosLink = await driver.findElement(By.id('usuarioslink'));
        await usuariosLink.click();
        await driver.sleep(5000); // Espera para asegurarse de que la nueva página esté completamente cargada

        // Verificar el contenido de la nueva página
        let regresarButton = await driver.findElement(By.id('regresar'));
        console.log('Regresar button displayed:', await regresarButton.isDisplayed());
        assert.isTrue(await regresarButton.isDisplayed(), 'Regresar button should be displayed');

        let pageTitle = await driver.findElement(By.css('.container-inicio h3')).getText();
        console.log('Page title:', pageTitle);
        assert.strictEqual(pageTitle, 'Mis Estudiantes', 'Page title should match');

        let tableHeaders = await driver.findElements(By.css('table thead th'));
        let headersText = [];
        for (let header of tableHeaders) {
            headersText.push(await header.getText());
        }
        console.log('Table headers:', headersText);
        assert.deepEqual(headersText, ['ID', 'Nombre', 'Email', 'Editar', 'Eliminar'], 'Table headers should match');

        // Pruebas de backend con axios
        const backendBaseUrl = 'http://localhost:8001'; // URL base del backend

        // Verificar que el endpoint de usuarios está funcionando
        const usersResponse = await axios.get(`${backendBaseUrl}/getUsers`);
        console.log('Users API response status:', usersResponse.status);
        assert.strictEqual(usersResponse.status, 200, 'Users API should return status 200');
        assert.isArray(usersResponse.data, 'Users API should return an array');

        // Verificar que el endpoint de guardar usuario está funcionando
        const saveUserResponse = await axios.post(`${backendBaseUrl}/saveUser`, {
            nombre: 'postman-testfdd4dfdsfreesfddd7fddff76',
            email: 'postman-test77dddf4fsdfsdrdeddfddfdff6@gmail.com',
            password: 'password7dffd4'
        });
        console.log('Save User API response status:', saveUserResponse.status);
        // Cambiar la aserción para aceptar el estado 201
        assert.strictEqual(saveUserResponse.status, 201, 'Save User API should return status 201');

        assert.property(saveUserResponse.data, 'id', 'Save User API response should contain id');

        // Verificar que el endpoint de encontrar usuario está funcionando
        const findUserResponse = await axios.get(`${backendBaseUrl}/findUser/13`);
        console.log('Find User API response status:', findUserResponse.status);

        // Verificar que el endpoint de eliminar usuario está funcionando
        const deleteUserResponse = await axios.delete(`${backendBaseUrl}/eliminarUser/13`);
        console.log('Delete User API response status:', deleteUserResponse.status);
        assert.strictEqual(deleteUserResponse.status, 204, 'Delete User API should return status 200');


        //CURSOS
        // Pruebas de backend con axios
        const backendBaseUrl2 = 'http://localhost:8002'; // URL base del backend

        // Verificar que el endpoint de usuarios está funcionando
        const usersResponse2 = await axios.get(`${backendBaseUrl2}/getCursos`);
        console.log('CURSO API response status:', usersResponse2.status);
        assert.strictEqual(usersResponse2.status, 200, 'Users API should return status 200');
        assert.isArray(usersResponse2.data, 'Users API should return an array');

        // Verificar que el endpoint de guardar usuario está funcionando
        const saveUserResponse2 = await axios.post(`${backendBaseUrl2}/saveCurso`, {
            nombre: 'postma3n'

        });
        console.log('Save Curso API response status:', saveUserResponse2.status);
        // Cambiar la aserción para aceptar el estado 201
        assert.strictEqual(saveUserResponse2.status, 201, 'Save User API should return status 201');

        assert.property(saveUserResponse2.data, 'id', 'Save User API response should contain id');

        // Verificar que el endpoint de encontrar usuario está funcionando
        const findUserResponse2 = await axios.get(`${backendBaseUrl2}/findCurso/2`);
        console.log('Find CURSO API response status:', findUserResponse2.status);

        // Verificar que el endpoint de eliminar usuario está funcionando
        const deleteUserResponse2 = await axios.delete(`${backendBaseUrl2}/eliminarCurso/2`);
        console.log('Delete CURSO API response status:', deleteUserResponse2.status);
        assert.strictEqual(deleteUserResponse2.status, 200, 'Delete User API should return status 200');




    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
})();
