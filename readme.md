# Репозиторий для верстки
Все переменные находятся в [var.less](/src/css/site/var.less)

### Шрифты

Формат используемых шрифтов: .woff и .woff2.
Для каждого начертания шрифта заводится своя переменная в [var.less](/src/css/site/var.less):
```
//===== fonts =====//
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
У шрифтов одной группы переменная @family должна быть одинаковой 

#### Миксин для "адаптивного" font-size
Использую когда нужно сделать шрифт "резиновым" (н-р для заголовков)
```
.calcFontSize(@f-min, @f-max, @v-min, @v-max);
```
где:
* @f-min - размер шрифта в точке @v-min
* @f-max - размер шрифта в точке @v-max
* @v-min - минимальный размер экрана (обычно использую значение 320)
* @v-max - максимальный размер экрана (обычно использую значение 1680)
```
Пример: .calcFontSize(30, 56, 320, 1680);
```

в остальных случиях размер шрифта статичный в px через переменную @b-fs
```
font-size: @b-fs - 2;
```

#### Миксин для "адаптивного" line-height
Использую когда нужно сделать межстрочный интервал "резиновым" (н-р для заголовков)
```
.calcLineHeight(@f-min, @f-max, @v-min, @v-max);
```
где:
* @f-min - размер шрифта в точке @v-min
* @f-max - размер шрифта в точке @v-max
* @v-min - минимальный размер экрана (обычно использую значение 320)
* @v-max - максимальный размер экрана (обычно использую значение 1680)
```
Пример: .calcLineHeight(30, 56, 320, 1680);
```

в остальных случиях межстрочный интервал статичный в px через переменную @b-lh
```
line-height: @b-lh - 2;
```

### Сетка в 12 колонок
Стили для сетки находятся в [var.less](/src/css/bootstrap/grid.less)</p>
Сетка сделана на flex. Grid пока не используем (когда решим вопрос с поддержкой ie, тогда будет смысл). Если хочеться поизголятся с grid - ок, но пишим флексовый fallback для ie10+.
Для правильного выравнивания и заполнения используется .container в него помещается .row внутри которого .cols
Модификаторы .row : 
* .is--wrap (flex-wrap: wrap)
* .is--jcfs (justify-content: flex-start)
* .is--jcfe (justify-content: flex-end)
* .is--jcsb (justify-content: space-between)
* .is--jcsa (justify-content: space-around)
* .is--jcc  (justify-content: center)
* .is--aic (align-items: center)
* .is--gutter (30px)
* .is--gutter15 (15px)
* .is--gutter10 (10px)
Подробнее в [grid.less](/src/css/bootstrap/grid.less)
Модификаторы .cols :
* .is--cols-* (от 1 до 12)
* .is--cols-screen-* (от 1 до 12)
* .is--cols-md-* (от 1 до 12)
Подробнее в [grid.less](/src/css/bootstrap/grid.less)

#### Миксин для создания ширины колонки:
```
.makeCols(@columns, @grid-columns);
```
где: 
* @columns - сколько колонок будет занимать элемент
* @grid-columns - общее количество колонок
```
Пример: 
.makeCols(6, 12);
```
### SVG графика
		<p>Простые иконки помещаем в папку src/svg/</p>
		<p>с помощью шаблона [[azbntple tpl="/src/block/site/default/svg-sprite/.html" icon-name="" ]] вставляем иконку на страницу. В icon-name пишем название файла <br>(Н-р [[azbntple tpl="/src/block/site/default/svg-sprite/.html" icon-name="vk" ]]).</p>
		<p>Изменения цвета иконки через color у родительского тега.</p>

### Переменные для медиа запросов
#### Последняя версия
		<p>В новых проектах использовать их.</p>	
		<h4>Общие:</h4>
		<ul>
			<li><b>@media-point-xxs</b> (x <= 565px)</li>
			<li><b>@media-point-xs</b> (566px >= x <= 767px)</li>
			<li><b>@media-point-sm</b> (768px >= x <= 991px)</li>
			<li>
				<b>@media-point-md</b> (992px >= x <= 1199px)
				<ul>				
					<li><b>@media-point-md1</b> (992px >= x <= 1024px)</li>
					<li><b>@media-point-md2</b> (1025px >= x <= 1199px)</li>
				</ul>
			</li>
			<li>
				<b>@media-point-lg</b> (1200px >= x <= 1399px)
				<ul>				
					<li><b>@media-point-lg1</b> (1200px >= x <= 1299px)</li>
					<li><b>@media-point-lg2</b> (1300px >= x <= 1399px)</li>
				</ul>
			</li>
			<li><b>@media-point-mdl</b> (992px >= x <= 1399px)</li>
			<li><b>@media-point-xl</b> (1400px >= x <= 1699px)</li>
			<li><b>@media-point-xxl</b> (1700px >= x)</li>
		</ul>
		<h4>Специализированные:</h4>		
		<ul>
			<li><b>@media-point-screen</b> (1025px >= x)</li>	
			<li><b>@media-point-device</b> (x <= 1024px)</li>
			<li><b>@media-point-screen-lg</b> (1200px >= x)</li>	
			<li><b>@media-point-device-lg</b> (x <= 1199px)</li>
			<li><b>@media-point-tablet</b> (768px >= x <= 1024px)</li>	
			<li><b>@media-point-smart</b> (x <= 767px)</li>
			<li><b>@media-point-notsmart</b> (768px >= x)</li>	
		</ul>
####Предыдущая версия</h2>
		<ul>
			<li>
				<b>@media-size-xs</b> (x <= 767px)
				<ul>				
					<li><b>@media-size-xs-p</b> (x <= 767px) и orientation:portrait</li>
					<li><b>@media-size-xs-l</b> (x <= 767px) и orientation:landscape</li>
				</ul>
			</li>
			<li>
				<b>@media-size-sm</b> (768px >= x <= 1024px)
				<ul>				
					<li><b>@media-size-sm-p</b> (768px >= x <= 1024px) и orientation:portrait</li>
					<li><b>@media-size-sm-l</b> (768px >= x <= 1024px) и orientation:landscape</li>
				</ul>
			</li>
			<li><b>@media-size-md</b> (1025px >= x <= 1199px)
			</li>
			<li><b>@media-size-lg</b> (1200px >= x <= 1399px)</li>
			<li><b>@media-size-mdl</b> (1025px >= x <= 1399px)</li>
			<li><b>@media-size-xl</b> (1400px >= x <= 1699px)</li>
			<li><b>@media-size-xxl</b> (1700px >= x)</li>
		</ul>
		<h4>Специализированные:</h4>		
		<ul>
			<li><b>@media-screen</b> (1025px >= x)</li>	
			<li><b>@media-device</b> (x <= 1024px)</li>
			<li><b>@media-screen-lg</b> (1200px >= x)</li>	
			<li><b>@media-device-lg</b> (x <= 1199px)</li>
			<li><b>@media-notsmart</b> (768px >= x)</li>	
		</ul>