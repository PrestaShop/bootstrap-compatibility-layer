# Bootstrap compatibility layer
Bootstrap compatibility layer was created to make it easier to transition modules and themes from boostrap 4 to bootstrap 5.

## Installation
You can install the Bootstrap compatibility layer from your prefered package.
```yml
npm install bootstrap-compatibility-layer
# OR
yarn add bootstrap-compatibility-layer
# OR
pnpm add bootstrap-compatibility-layer
```
Or use it directly through our CDN:
```html
[...]
<link href="https://unpkg.com/bootstrap-compatibility-layer@1/dist/bootstrap-compatibility-layer.min.css" rel="stylesheet">
[...]
<script src="https://unpkg.com/bootstrap-compatibility-layer@1"></script>
[...]
```

## Utilisation
### Package
L'utilisation en tant que package est très simple il suffit de le charger sur votre script
```ts
import BSCompatibilityLayer from 'bootstrap-compatibility-layer';
```
The compatibility layer initializes automatically; however, you can call the methods independently if you need to.
```ts
BSCompatibilityLayer.updateAllDataAttributes();
```
### CDN
If you only want to use attribute modifiers, you can place the tag wherever you want in your code. However, if you want to use jQuery commands relating to Bootstrap, it is advisable to put it first in the list of your scripts and to wait for the DOM to be loaded before using them like the following code:
```html
[...]
<link href="https://unpkg.com/bootstrap-compatibility-layer@1/dist/bootstrap-compatibility-layer.min.css" rel="stylesheet">
[...]
<script src="https://unpkg.com/bootstrap-compatibility-layer@1"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    $('[data-toggle="popover"]').popover()

    $('[data-toggle="tooltip"]').tooltip()
  });
</script>
```

## Contributing
Contributions are welcome!

## About PrestaShop
PrestaShop is a free and Open Source e-commerce web application written in PHP, committed to providing the best shopping cart experience for both merchants and customers. [Learn more about PrestaShop](https://www.prestashop-project.org/)

## License
This Bootstrap compatibility layer is released under the [MIT License](LICENSE).
