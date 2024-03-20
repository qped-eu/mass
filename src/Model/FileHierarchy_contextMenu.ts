//@ts-nocheck
declare global {
    interface Window { refToThisContextMenu: any; referenceToDHTMLSuiteContextMenu:any; refToContextMenu:any;}
}

export default class FileHierarchyContextMenu {
    menuModels: any[];
    menuObject: any; // Reference to context menu div
    menuUls: any[]; // Array of <ul> elements
    width: number; // Width of context menu
    srcElement: boolean; // Reference to the element which triggered the context menu, i.e. the element which caused the context menu to be displayed.
    indexCurrentlyDisplayedMenuModel: boolean; // Index of currently displayed menu model.
    imagePath: string;

    constructor() {
        this.menuModels = [];
        this.menuObject = false;
        this.menuUls = [];
        this.width = 100;
        this.srcElement = false;
        this.indexCurrentlyDisplayedMenuModel = false;
        this.imagePath = 'images/';
    }

    setWidth(newWidth: number) {
        this.width = newWidth;
    }

    /**
     *	Add menu items
     *  @param Object HTML Element = Reference to html element
     *  @param String elementId = String id of element(optional). An alternative to HTML Element	
     */	
    public attachToElement(element: HTMLElement, elementId: string, menuModel: any) {
        window.refToThisContextMenu = this;
        if (!element && elementId) element = document.getElementById(elementId);
        if (!element.id) {
            element.id = 'context_menu' + Math.random();
            element.id = element.id.replace('.', '');
        }
        this.menuModels[element.id] = menuModel;
        element.oncontextmenu = this.__displayContextMenu;
        document.documentElement.onclick = this.__hideContextMenu;
    }

    /**
     *	Displays the context menu
     *  @param MouseEvent e
     */	
    private __displayContextMenu(e: MouseEvent) {
        var ref = window.referenceToDHTMLSuiteContextMenu;
        ref.srcElement = ref.getSrcElement(e);
        if (!ref.indexCurrentlyDisplayedMenuModel || ref.indexCurrentlyDisplayedMenuModel != this.id) {
            if (ref.indexCurrentlyDisplayedMenuModel) {
                ref.menuObject.innerHTML = '';
            } else {
                ref.__createDivs();
            }
            ref.menuItems = ref.menuModels[this.id].getItems();
            ref.__createMenuItems();
        }
        ref.indexCurrentlyDisplayedMenuModel = this.id;
        ref.menuObject.style.left = (e.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)) + 'px';
        ref.menuObject.style.top = (e.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop)) + 'px';
        ref.menuObject.style.display = 'block';
        return false;
    }

    /**
     *	Hide the context menu
     */	
    private __hideContextMenu() {
        let ref = window.referenceToDHTMLSuiteContextMenu;
        if (ref.menuObject) ref.menuObject.style.display = 'none';
    }

     /**
     *	Creates general divs for the menu
     */		
    private __createDivs() {
        this.menuObject = document.createElement('DIV');
        this.menuObject.className = 'DHTMLSuite_contextMenu';
        if (this.width) this.menuObject.style.width = this.width + 'px';
        document.body.appendChild(this.menuObject);
    }

     /**
     *	Display mouse over effect when moving the mouse over a menu item
     */
    private __mouseOver() {
        this.className = 'DHTMLSuite_item_mouseover';
        this.style.backgroundPosition = 'left center';
    }

    /**
     *	Remove mouse over effect when moving the mouse away from a menu item
     */	
    private __mouseOut() {
        this.className = '';
        this.style.backgroundPosition = '1px center';
    }

    /**
     *	Execute jsFunction
     */
    __evalUrl() {
        var js = this.getAttribute('jsFunction');
        if (!js) js = this.jsFunction;
        if (js) eval(js);
    }


    /**
     *	Create menu items
     */
    private __createMenuItems() {
        window.refToContextMenu = this;     // Reference to menu strip object
        this.menuUls = [];
        for (let no in this.menuItems) {    // Looping through menu items	
            if (!this.menuUls[0]) {     // Create main ul element
                this.menuUls[0] = document.createElement('UL');
                this.menuObject.appendChild(this.menuUls[0]);
            }
            if (this.menuItems[no]['depth'] == 1) {
                if (this.menuItems[no]['separator']) {
                    let li = document.createElement('DIV');
                    li.className = 'DHTMLSuite_contextMenu_separator';
                } else {
                    var li = document.createElement('LI');
                    if (this.menuItems[no]['jsFunction']) {
                        this.menuItems[no]['url'] = this.menuItems[no]['jsFunction'] + '(this,referenceToDHTMLSuiteContextMenu.srcElement)';
                    }
                    if (this.menuItems[no]['itemIcon']) {
                        li.style.backgroundImage = 'url(\'' + this.menuItems[no]['itemIcon'] + '\')';
                        li.style.backgroundPosition = '1px center';
                    }
                    if (this.menuItems[no]['url']) {
                        let url = this.menuItems[no]['url'] + '';
                        li.setAttribute('jsFunction', url);
                        li.jsFunction = url;
                        li.onclick = this.__evalUrl;
                    }
                    li.innerHTML = '<a href="#" onclick="return false">' + this.menuItems[no]['itemText'] + '</a>';
                    li.onmouseover = this.__mouseOver;
                    li.onmouseout = this.__mouseOut;
                }
                this.menuUls[0].appendChild(li);
            }
        }
    }

    /**
     *  Returns a reference to the element which triggered an event.
     *	@param Event e = Event object
     */	 
    private getSrcElement(e: MouseEvent) {
        var el;
        if (e.target) el = e.target;
        else if (e.srcElement) el = e.srcElement;
        if (el.nodeType == 3) el = el.parentNode; // defeat Safari bug
        return el;
    }

    /**
     *  @param String cssFileName Name of css file 		
     */	
    public setLayoutCss(cssFileName: string) {
        this.layoutCSS = cssFileName;
    }

    /**
     *	Creates a reference to current context menu object. (Note: This method should be deprecated as only one context menu object is needed)
     *  @param Obj context menu object = Reference to context menu object
     */	
    private __setReference(obj: any) {
        window.referenceToDHTMLSuiteContextMenu = obj;
    }
}