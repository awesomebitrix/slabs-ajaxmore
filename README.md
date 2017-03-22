# slabs-ajaxmore
Универсальная реализация кнопки "Показать еще" для стандартного компонента пагинация, подгружающая контент многостраничного компонента.   

## [Как это работает ?]()

## Код компонента, контент которого будем подгружать
1.   
В начале   
```
use Bitrix\Main\Context;
global $arMore;
```

2.   
Заключаем всю облать в обвертку при этом пагинация должна быть в не этой области.   
Именно в конце этой области будет добавляться новый контент.   
К примеру  
```
<div class="sl-wrapper">
    Весь компонент выводиться тут, и в самом низу этого блога будет добавляться новый контент
</div>

//тут выводиться пагинация

```
3.   
Сразу после обвертки добавляем код   
```
if ( Context::getCurrent()->getRequest()->isAjaxRequest() ) {
    $this->SetViewTarget('bufer');
}

// тут генерирются элементы.

if ( Context::getCurrent()->getRequest()->isAjaxRequest() ) {
    $this->EndViewTarget();
    $APPLICATION->RestartBuffer();
    $arMore["content_html"] = $APPLICATION->GetViewContent('bufer');
    echo json_encode($arMore);
    die();
}?>

```
В итоге общий вид должен получиться такой:   
```
use Bitrix\Main\Context;
global $arMore;

<div class="sl-wrapper">
    if ( Context::getCurrent()->getRequest()->isAjaxRequest() ) {
        $this->SetViewTarget('bufer');
    }
    
    foreach($arResult["ITEMS"] as $arItem){
    	<p class="news-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
    	    <?=$arItem["NAME"]?>
    	</p>	
    }
    
    if ( Context::getCurrent()->getRequest()->isAjaxRequest() ) {
        $this->EndViewTarget();
        $APPLICATION->RestartBuffer();
        $arMore["content_html"] = $APPLICATION->GetViewContent('bufer');
        echo json_encode($arMore);
        die();
    }?>
</div>

<?if($arParams["DISPLAY_BOTTOM_PAGER"]) {
    echo $arResult["NAV_STRING"];
}?>
```
