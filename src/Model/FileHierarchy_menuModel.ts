export default class FileHierarchy_menuModel {
    
    private menuItems: { [id: string]: any };

    constructor() {
        this.menuItems = {};
    }

    /**
     *	Add separator (special type of menu item)
     *  @param int id of menu item
     *  @param string itemText = text of menu item
     *  @param string itemIcon = file name of menu icon(in front of menu text. Path will be imagePath for the DHTMLSuite + file name)
     *  @param string url = Url of menu item
     *  @param string parent id of menu item     
     *  @param String jsFunction Name of javascript function to execute. It will replace the url param. The function with this name will be called and the element triggering the action will be 
     *					sent as argument. Name of the element which triggered the menu action may also be sent as a second argument. That depends on the widget. The context menu is an example where
     *					the element triggering the context menu is sent as second argument to this function.    
     */	
    public addItem(id: string, itemText: string, itemIcon: string, url: string, parentId: string, jsFunction: any): void {
        this.menuItems[id] = {};
        this.menuItems[id]['id'] = id;
        this.menuItems[id]['itemText'] = itemText;
        this.menuItems[id]['itemIcon'] = itemIcon;
        this.menuItems[id]['url'] = url;
        this.menuItems[id]['parentId'] = parentId;
        this.menuItems[id]['separator'] = false;
        this.menuItems[id]['jsFunction'] = jsFunction;
    }

    /**
     *	Add separator (special type of menu item)
     *  @param int id of menu item
     *  @param string parent id of menu item
     * 	@public	
     */	
    public addSeparator(id: string, parentId: string): void {
        this.menuItems[id] = {};
        this.menuItems[id]['parentId'] = parentId;
        this.menuItems[id]['separator'] = true;
    }

    /**
     *	Initilizes the menu model. This method should be called when all items has been added to the model.
     */	
    public init(): void {
        this.__getDepths();
    }

    /**
     * @return menuItems	
     */	
    public getItems(): { [id: string]: any } {
        return this.menuItems;
    }

    /**
     *	Create variable for the depth of each menu item.
     */	
    private __getDepths(): void {
        for (let no in this.menuItems) {
            this.menuItems[no]['depth'] = 1;
            if (this.menuItems[no]['parentId']) {
                this.menuItems[no]['depth'] = this.menuItems[this.menuItems[no]['parentId']]['depth'] + 1;
            }
        }
    }

    /**
     *	Does a menu item have sub elements ?
     * @private	
     */	
    private __hasSubs(id: string): boolean {
        for (let no in this.menuItems) { // Looping through menu items
            if (this.menuItems[no]['parentId'] == id)
                return true;
        }
        return false;
    }
}