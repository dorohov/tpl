# Репозиторий для верстки
Все переменные находятся в [var.less](/src/css/site/var.less)

### Шрифты

Формат используемых шрифтов: `.woff` и `.woff2`.
Для каждого начертания шрифта заводится своя переменная в [var.less](/src/css/site/var.less):
```
@geometria: 				geometria-400;
@geometria-400i: 			geometria-400i;
@geometria-300: 			geometria-300;
@geometria-500: 			geometria-500;
@geometria-700: 			geometria-700;
```
Шрифт подключается в [font.less](/src/css/site/font.less) через миксин
```
.include-custom-font();
Например:
.include-custom-font(
	@family: @geometria,
	@src-name: @geometria,
	@weight: 400, 
	@style: normal
);
.include-custom-font(
	@family: @geometria,
	@src-name: @geometria-400i,
	@weight: 400, 
	@style: italic
);
```
У шрифтов одной группы переменная `@family` должна быть одинаковой 

#### Миксин для "адаптивного" `font-size`
Использую когда нужно сделать шрифт "резиновым" (н-р для заголовков)
```
.calcFontSize(@f-min, @f-max, @v-min, @v-max);
```
где:
* `@f-min` - размер шрифта в точке @v-min
* `@f-max` - размер шрифта в точке @v-max
* `@v-min` - минимальный размер экрана (обычно использую значение 320)
* `@v-max` - максимальный размер экрана (обычно использую значение 1680)
```
Пример: .calcFontSize(30, 56, 320, 1680);
```

в остальных случиях размер шрифта статичный в px через переменную @b-fs
```
font-size: @b-fs - 2;
```

#### Миксин для "адаптивного" `line-height`
Использую когда нужно сделать межстрочный интервал "резиновым" (н-р для заголовков)
```
.calcLineHeight(@f-min, @f-max, @v-min, @v-max);
```
где:
* `@f-min` - размер шрифта в точке @v-min
* `@f-max` - размер шрифта в точке @v-max
* `@v-min` - минимальный размер экрана (обычно использую значение 320)
* `@v-max` - максимальный размер экрана (обычно использую значение 1680)
```
Пример: .calcLineHeight(30, 56, 320, 1680);
```

в остальных случиях межстрочный интервал статичный в px через переменную `@b-lh`
```
line-height: @b-lh - 2;
```

### Сетка в 12 колонок
Стили для сетки находятся в [var.less](/src/css/bootstrap/grid.less)</p>
Сетка сделана на flex. Grid пока не используем (когда решим вопрос с поддержкой ie, тогда будет смысл). Если хочеться поизголятся с grid - ок, но пишим флексовый fallback для ie10+.
Для правильного выравнивания и заполнения используется `.container` в него помещается `.row` внутри которого `.cols`

Модификаторы `.row` : 
* `.is--wrap` (flex-wrap: wrap)
* `.is--jcfs` (justify-content: flex-start)
* `.is--jcfe` (justify-content: flex-end)
* `.is--jcsb` (justify-content: space-between)
* `.is--jcsa` (justify-content: space-around)
* `.is--jcc`  (justify-content: center)
* `.is--aic` (align-items: center)
* `.is--gutter` (30px)
* `.is--gutter15` (15px)
* `.is--gutter10` (10px)

Подробнее в [grid.less](/src/css/bootstrap/grid.less)

Модификаторы `.cols` :
* `.is--cols-*` (от 1 до 12)
* `.is--cols-screen-*` (от 1 до 12)
* `.is--cols-md-*` (от 1 до 12)

Подробнее в [grid.less](/src/css/bootstrap/grid.less)

#### Миксин для создания ширины колонки:
```
.makeCols(@columns, @grid-columns);
```
где: 
* @columns - сколько колонок будет занимать элемент
* @grid-columns - общее количество колонок
```
.makeCols(6, 12);
```
### SVG графика
Простые иконки помещаем в папку [svg](/src/svg/)
Шаблон для вызова иконки на странице
``` 
[[azbntple tpl="/src/block/site/default/svg-sprite/.html" icon-name="" ]] 
```
icon-name - название файла

Изменения цвета иконки через color у родительского тега.
```
<div class="vk" style="#000">
	[[azbntple tpl="/src/block/site/default/svg-sprite/.html" icon-name="vk" ]]
</div>
```

### Переменные для медиа запросов
#### Последняя версия
В новых проектах использовать их.	

##### Общие: 
* `@media-point-xxs` (x <= 565px)
* `@media-point-xs` (566px >= x <= 767px)
* `@media-point-sm` (768px >= x <= 991px)
* `@media-point-md` (992px >= x <= 1199px)
	* `@media-point-md1` (992px >= x <= 1024px)
	* `@media-point-md2` (1025px >= x <= 1199px)
* `@media-point-lg` (1200px >= x <= 1399px)
	* `@media-point-lg1` (1200px >= x <= 1299px)
	* `@media-point-lg2` (1300px >= x <= 1399px)
* `@media-point-mdl` (992px >= x <= 1399px)
* `@media-point-xl` (1400px >= x <= 1699px)
* `@media-point-xxl` (1700px >= x)

#### Специализированные:
* `@media-point-screen` (1025px >= x)
* `@media-point-device` (x <= 1024px)
* `@media-point-screen-lg` (1200px >= x)
* `@media-point-device-lg` (x <= 1199px)
* `@media-point-tablet` (768px >= x <= 1024px)
* `@media-point-smart` (x <= 767px)
* `@media-point-notsmart` (768px >= x)

#### Предыдущая версия
* `@media-size-xs` (x <= 767px)
	* `@media-size-xs-p` (x <= 767px) и orientation:portrait
	* `@media-size-xs-l` (x <= 767px) и orientation:landscape
* `@media-size-sm` (768px >= x <= 1024px)
	* `@media-size-sm-p` (768px >= x <= 1024px) и orientation:portrait
	* `@media-size-sm-l` (768px >= x <= 1024px) и orientation:landscape
* `@media-size-md` (1025px >= x <= 1199px)
* `@media-size-lg` (1200px >= x <= 1399px)
* `@media-size-mdl` (1025px >= x <= 1399px)
* `@media-size-xl` (1400px >= x <= 1699px)
* `@media-size-xxl` (1700px >= x)

#### Специализированные:
* `@media-screen` (1025px >= x)
* `@media-device` (x <= 1024px)
* `@media-screen-lg` (1200px >= x)
* `@media-device-lg` (x <= 1199px)
* `@media-notsmart` (768px >= x)