//@ts-nocheck
import FileHierarchy_menuModel from "../Model/FileHierarchy_menuModel.js";
import FileHierarchy_contextMenu from "../Model/FileHierarchy_contextMenu.js";

declare global {
    interface Window { JSTreeObj: any; }
}

window.JSTreeObj = '';
export default class JSDragDropTree {
    private idOfTree: string | null;
    private dragNode_source: HTMLElement | null;
    private dragNode_parent: HTMLElement | null;
    private dragNode_sourceNextSib: HTMLElement | null;
    private dragNode_destination: boolean;
    private dropTargetIndicator: HTMLElement | null;
    private imageFolder: string;
    private plusIconClassName: string;
    private minusIconClassName: string;
    private maximumDepth: number;
    private contextMenu: boolean;
    private floatingContainer: HTMLElement;
    private dragDropTimer: number;
    private dragNode_noSiblings: boolean;
    private currentItemToEdit: boolean;
    private indicator_offsetX: number;
    private indicator_offsetX_sub: number;
    private indicator_offsetY: number;
    private messageMaximumDepthReached: string;
    private renameAllowed: boolean;
    private deleteAllowed: boolean;
    private currentlyActiveItem: boolean;
    private ajaxObjects: any[];
    private helpObj: any;
    private RENAME_STATE_BEGIN: number;
    private RENAME_STATE_CANCELED: number;
    private RENAME_STATE_REQUEST_SENDED: number;
    private renameState: number;

    constructor() {
        this.idOfTree = null;
        this.dragNode_source = null;
        this.dragNode_parent = null;
        this.dragNode_sourceNextSib = null;
        this.dragNode_destination = false;
        this.dropTargetIndicator = null;
        this.imageFolder = 'assets/images/';
        this.plusIconClassName = 'uil uil-angle-right';
        this.minusIconClassName = 'uil uil-angle-down';
        this.maximumDepth = 6;
        this.contextMenu = false;
        this.floatingContainer = document.createElement('UL');
        this.floatingContainer.style.position = 'absolute';
        this.floatingContainer.style.display = 'none';
        this.floatingContainer.id = 'floatingContainer';
        document.body.appendChild(this.floatingContainer);
        this.dragDropTimer = -1;
        this.dragNode_noSiblings = false;
        this.currentItemToEdit = false;
        this.indicator_offsetX = 2; // Offset position of small black lines indicating where nodes would be dropped.
        this.indicator_offsetX_sub = 4;
        this.indicator_offsetY = 2;
        this.messageMaximumDepthReached = '';
        this.renameAllowed = true;
        this.deleteAllowed = true;
        this.currentlyActiveItem = false;
        this.ajaxObjects = [];
        this.helpObj = null;
        this.RENAME_STATE_BEGIN = 1;
        this.RENAME_STATE_CANCELED = 2;
        this.RENAME_STATE_REQUEST_SENDED = 3;
        this.renameState = null;
    }

    /**
	 *  This function adds an event listener to an element on the page.
	 *
	 *	@param Object whichObject = Reference to HTML element(Which object to assigne the event)
	 *	@param String eventType = Which type of event, example "mousemove" or "mouseup"
	 *	@param functionName = Name of function to execute. 
	 */	
    public addEvent(whichObject: any, eventType: string, functionName: any) {
        if (whichObject.attachEvent) {
            whichObject['e' + eventType + functionName] = functionName;
            whichObject[eventType + functionName] = function () { whichObject['e' + eventType + functionName](window.event); };
            whichObject.attachEvent('on' + eventType, whichObject[eventType + functionName]);
        } else {
            whichObject.addEventListener(eventType, functionName, false);
        }
    }

    /**
	 *  This function removes an event listener from an element on the page.
	 *
	 *	@param Object whichObject = Reference to HTML element(Which object to assigne the event)
	 *	@param String eventType = Which type of event, example "mousemove" or "mouseup"
	 *	@param functionName = Name of function to execute. 
	 */	
    removeEvent(whichObject: any, eventType: string, functionName: any) {
        if (whichObject.detachEvent) {
            whichObject.detachEvent('on' + eventType, whichObject[eventType + functionName]);
            whichObject[eventType + functionName] = null;
        } else {
            whichObject.removeEventListener(eventType, functionName, false);
        }
    }

    /**
     * Get the value of a cookie
     * @param cname = cookie name
     * @returns the value of a cookie
     */
    Get_Cookie(cname: string) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return decodeURIComponent(c.substring(name.length, c.length));
            }
        }
        return null;
    }

    /**
     * Set a cookie on browser
     * @param name = cookie name
     * @param value = cookie value
     * @param expires = lifetime of the cookie
     * @param path = path of the cookie
     * @param domain = domain for the cookie 
     * @param secure = is the cookie secure or not
     */
    Set_Cookie(name: string, value: string, expires: number, path: string, domain: string, secure: boolean) {
        expires = expires * 60 * 60 * 24 * 1000;
        let today = new Date();
        let expires_date = new Date(today.getTime() + (expires));
        let cookieString = name + "=" + encodeURIComponent(value) +
            ((expires) ? ";expires=" + expires_date.toUTCString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
        document.cookie = cookieString;
    }

    setRenameAllowed(renameAllowed: boolean) {
        this.renameAllowed = renameAllowed;
    }

    setDeleteAllowed(deleteAllowed: boolean) {
        this.deleteAllowed = deleteAllowed;
    }

    setMaximumDepth(maxDepth: number) {
        this.maximumDepth = maxDepth;
    }

    setMessageMaximumDepthReached(newMessage: string) {
        this.messageMaximumDepthReached = newMessage;
    }

    setImageFolder(path: string) {
        this.imageFolder = path;
    }

    setTreeId(idOfTree: string) {
        this.idOfTree = idOfTree;
    }

    expandAll() {
        var menuItems = (document.getElementById(this.idOfTree) as HTMLElement).getElementsByTagName('LI');
        for (let no = 0; no < menuItems.length; no++) {
            let subItems : any = menuItems[no].getElementsByTagName('UL');
            if (subItems.length > 0 && subItems[0].style.display != 'block') {
                window.JSTreeObj.showHideNode(false, menuItems[no].id);
            }
        }
    }

    collapseAll() {
        var menuItems = (document.getElementById(this.idOfTree) as HTMLElement).getElementsByTagName('LI');
        for (let no = 0; no < menuItems.length; no++) {
            let subItems : any = menuItems[no].getElementsByTagName('UL');
            if (subItems.length > 0 && subItems[0].style.display == 'block') {
                window.JSTreeObj.showHideNode(false, menuItems[no].id);
            }
        }
    }

    /**
     * Find top position of a tree node
     * @param obj 
     * @returns 
     */
    getTopPos(obj: HTMLElement) {
        var top = obj.offsetTop / 1;
        while ((obj = obj.offsetParent) != null) {
            if (obj.tagName != 'HTML') top += obj.offsetTop;
        }
        if (document.all) top = top / 1 + 13; else top = top / 1 + 4;
        return top;
    }

    /**
     * Find left position of a tree node
     * @param obj 
     * @returns 
     */
    getLeftPos(obj: HTMLElement) {
        var left = obj.offsetLeft / 1 + 1;
        while ((obj = obj.offsetParent) != null) {
            if (obj.tagName != 'HTML') left += obj.offsetLeft;
        }
        if (document.all) left = left / 1 - 2;
        return left;
    }

    showHideNode(e: any = false, inputId: string) {
        let thisNode = null;
        let initExpandedNodes = this.Get_Cookie('filehierarchy_expandedNodes');
        if (inputId) {
            if (!document.getElementById(inputId)) return;
            thisNode = (document.getElementById(inputId) as HTMLElement).getElementsByTagName('I')[0];
        } else {
            thisNode = this;
            if (this.tagName == 'A') thisNode = this.parentNode.getElementsByTagName('I')[0];
        }
        if (thisNode.style.visibility == 'hidden') return;
        var parentNode = thisNode.parentNode;
        inputId = parentNode.id.replace(/[^0-9]/g, '');
        if (thisNode.className == window.JSTreeObj.plusIconClassName) {
            thisNode.className = window.JSTreeObj.minusIconClassName;
            let ul = parentNode.getElementsByTagName('UL')[0];
            ul.style.display = 'block';
            if (!initExpandedNodes) initExpandedNodes = ',';
            if (initExpandedNodes.indexOf(',' + inputId + ',') < 0) initExpandedNodes = initExpandedNodes + inputId + ',';
        } else {
            thisNode.className = window.JSTreeObj.plusIconClassName;
            parentNode.getElementsByTagName('UL')[0].style.display = 'none';
            initExpandedNodes = initExpandedNodes.replace(',' + inputId, '');
        }
        window.JSTreeObj.Set_Cookie('filehierarchy_expandedNodes', initExpandedNodes, 500);
        return false;
    }

    /**
     * Initialize drag 
     * @param e = default event
     * @returns 
     */
    initDrag(e: any) {
        if (document.all) e = event;
        var subs = window.JSTreeObj.floatingContainer.getElementsByTagName('LI');
        if (subs.length > 0) {
            if (window.JSTreeObj.dragNode_sourceNextSib) {
                window.JSTreeObj.dragNode_parent.insertBefore(window.JSTreeObj.dragNode_source, window.JSTreeObj.dragNode_sourceNextSib);
            } else {
                window.JSTreeObj.dragNode_parent.appendChild(window.JSTreeObj.dragNode_source);
            }
        }
        window.JSTreeObj.dragNode_source = this.parentNode;
        window.JSTreeObj.dragNode_parent = this.parentNode.parentNode;
        window.JSTreeObj.dragNode_sourceNextSib = false;
        if (window.JSTreeObj.dragNode_source.nextSibling) window.JSTreeObj.dragNode_sourceNextSib = window.JSTreeObj.dragNode_source.nextSibling;
        window.JSTreeObj.dragNode_destination = false;
        window.JSTreeObj.dragDropTimer = 0;
        window.JSTreeObj.timerDrag();
        return false;
    }

    timerDrag() {
        if (this.dragDropTimer >= 0 && this.dragDropTimer < 10) {
            this.dragDropTimer = this.dragDropTimer + 1;
            setTimeout('JSTreeObj.timerDrag()', 20);
            return;
        }
        if (this.dragDropTimer == 10) {
            window.JSTreeObj.floatingContainer.style.display = 'block';
            window.JSTreeObj.floatingContainer.appendChild(window.JSTreeObj.dragNode_source);
        }
    }

    moveDragableNodes(e: any) {
        if (window.JSTreeObj.dragDropTimer < 10) return;
        if (document.all) e = event;
        let dragDrop_x = e.clientX / 1 + 5 + document.body.scrollLeft;
        let dragDrop_y = e.clientY / 1 + 5 + document.documentElement.scrollTop;
        window.JSTreeObj.floatingContainer.style.left = dragDrop_x + 'px';
        window.JSTreeObj.floatingContainer.style.top = dragDrop_y + 'px';
        var thisObj = this;
        if (thisObj.tagName == 'A' || thisObj.tagName == 'IMG') thisObj = thisObj.parentNode;
        window.JSTreeObj.dragNode_noSiblings = false;
        var tmpVar = thisObj.getAttribute('noSiblings');
        if (!tmpVar) tmpVar = thisObj.noSiblings;
        if (tmpVar == 'true') window.JSTreeObj.dragNode_noSiblings = true;
        if (thisObj && thisObj.id) {
            window.JSTreeObj.dragNode_destination = thisObj;
            var tmpObj = window.JSTreeObj.dropTargetIndicator;
            tmpObj.style.display = 'block';
            var eventSourceObj = this;
            if (window.JSTreeObj.dragNode_noSiblings && eventSourceObj.tagName == 'IMG') eventSourceObj = eventSourceObj.nextSibling;
            var tmpImg = tmpObj.getElementsByTagName('IMG')[0];
            if (this.tagName == 'A' || window.JSTreeObj.dragNode_noSiblings) {
                tmpImg.src = tmpImg.src.replace('ind1', 'ind2');
                window.JSTreeObj.insertAsSub = true;
                tmpObj.style.left = (window.JSTreeObj.getLeftPos(eventSourceObj) + window.JSTreeObj.indicator_offsetX_sub) + 'px';
            } else {
                tmpImg.src = tmpImg.src.replace('ind2', 'ind1');
                window.JSTreeObj.insertAsSub = false;
                tmpObj.style.left = (window.JSTreeObj.getLeftPos(eventSourceObj) + window.JSTreeObj.indicator_offsetX) + 'px';
            }
            tmpObj.style.top = (window.JSTreeObj.getTopPos(thisObj) + window.JSTreeObj.indicator_offsetY) + 'px';
        }
        return false;
    }

    dropDragableNodes() {
        if (window.JSTreeObj.dragDropTimer < 10) {
            window.JSTreeObj.dragDropTimer = -1;
            return;
        }
        var showMessage = false;
        if (window.JSTreeObj.dragNode_destination) { // Check depth
            var countUp = window.JSTreeObj.dragDropCountLevels(window.JSTreeObj.dragNode_destination, 'up');
            var countDown = window.JSTreeObj.dragDropCountLevels(window.JSTreeObj.dragNode_source, 'down');
            var countLevels = countUp / 1 + countDown / 1 + (window.JSTreeObj.insertAsSub ? 1 : 0);
            if (countLevels > window.JSTreeObj.maximumDepth) {
                window.JSTreeObj.dragNode_destination = false;
                showMessage = true; // Used later down in this function
            }
        }
        if (window.JSTreeObj.dragNode_destination) {
            if (window.JSTreeObj.insertAsSub) {
                var uls = window.JSTreeObj.dragNode_destination.getElementsByTagName('UL');
                if (uls.length > 0) {
                    ul = uls[0];
                    ul.style.display = 'block';
                    var lis = ul.getElementsByTagName('LI');
                    if (lis.length > 0) { // Sub elements exists - drop dragable node before the first one
                        ul.insertBefore(window.JSTreeObj.dragNode_source, lis[0]);
                    } else { // No sub exists - use the appendChild method - This line should not be executed unless there's something wrong in the HTML, i.e empty <ul>
                        ul.appendChild(window.JSTreeObj.dragNode_source);
                    }
                } else {
                    var ul = document.createElement('UL');
                    ul.style.display = 'block';
                    window.JSTreeObj.dragNode_destination.appendChild(ul);
                    ul.appendChild(window.JSTreeObj.dragNode_source);
                }
                var ico = window.JSTreeObj.dragNode_destination.getElementsByTagName('I')[0];
                ico.style.visibility = 'visible';
                ico.className = window.JSTreeObj.minusIconClassName;
            } else {
                if (window.JSTreeObj.dragNode_destination.nextSibling) {
                    var nextSib = window.JSTreeObj.dragNode_destination.nextSibling;
                    nextSib.parentNode.insertBefore(window.JSTreeObj.dragNode_source, nextSib);
                } else {
                    window.JSTreeObj.dragNode_destination.parentNode.appendChild(window.JSTreeObj.dragNode_source);
                }
            }
            // Clear parent object
            var tmpObj = window.JSTreeObj.dragNode_parent;
            var lis = tmpObj.getElementsByTagName('LI');
            if (lis.length == 0) {
                var ico = tmpObj.parentNode.getElementsByTagName('I')[0];
                ico.style.visibility = 'hidden';
                tmpObj.parentNode.removeChild(tmpObj);
            }

        } else {
            // Putting the item back to it's original location
            if (window.JSTreeObj.dragNode_sourceNextSib) {
                window.JSTreeObj.dragNode_parent.insertBefore(window.JSTreeObj.dragNode_source, window.JSTreeObj.dragNode_sourceNextSib);
            } else {
                window.JSTreeObj.dragNode_parent.appendChild(window.JSTreeObj.dragNode_source);
            }
        }
        window.JSTreeObj.dropTargetIndicator.style.display = 'none';
        window.JSTreeObj.dragDropTimer = -1;
        if (showMessage && window.JSTreeObj.messageMaximumDepthReached) alert(window.JSTreeObj.messageMaximumDepthReached);
    }

    createDropIndicator() {
        this.dropTargetIndicator = document.createElement('DIV');
        this.dropTargetIndicator.style.position = 'absolute';
        this.dropTargetIndicator.style.display = 'none';
        let img = document.createElement('IMG');
        img.src = this.imageFolder + 'dragDrop_ind1.gif';
        img.id = 'dragDropIndicatorImage';
        this.dropTargetIndicator.appendChild(img);
        this.dropTargetIndicator.appendChild(img);
        document.body.appendChild(this.dropTargetIndicator);
    }

    dragDropCountLevels(obj: HTMLElement, direction: string, stopAtObject?: HTMLElement) {
        var countLevels = 0;
        if (direction == 'up') {
            while (obj.parentNode && obj.parentNode != stopAtObject) {
                obj = obj.parentNode;
                if (obj.tagName == 'UL') countLevels = countLevels / 1 + 1;
            }
            return countLevels;
        }
        if (direction == 'down') {
            var subObjects = obj.getElementsByTagName('LI');
            for (let no = 0; no < subObjects.length; no++) {
                countLevels = Math.max(countLevels, window.JSTreeObj.dragDropCountLevels(subObjects[no], "up", obj));
            }
            return countLevels;
        }
    }

    cancelEvent() {
        return false;
    }

    cancelSelectionEvent() {
        if (window.JSTreeObj.dragDropTimer < 10) return true;
        return false;
    }

    getNodeOrders(initObj?: HTMLElement, saveString?: string) {
        if (!saveString) var saveString = '';
        if (!initObj) {
            initObj = document.getElementById(this.idOfTree);
        }
        
        var lis = initObj.getElementsByTagName('LI');
        if (lis.length > 0) {
            var li = lis[0];
            while (li) {
                if (li.id) {
                    if (saveString.length > 0) saveString = saveString + ',';
                    var numericID = li.id.replace(/[^0-9]/gi, '');
                    if (numericID.length == 0) numericID = 'A';
                    
                    var numericParentID = li.parentNode.parentNode.id.replace(/[^0-9]/gi, '');
                    if (numericID != '0') {
                        saveString = saveString + numericID;
                        saveString = saveString + '-';
                        if (li.parentNode.id != this.idOfTree) saveString = saveString + numericParentID; else saveString = saveString + '0';
                    }
                    var ul = li.getElementsByTagName('UL');
                    if (ul.length > 0) {
                        saveString = this.getNodeOrders(ul[0], saveString);
                    }
                }
                li = li.nextSibling;
            }
        }
        if (initObj.id == this.idOfTree) {
            return saveString;
        }
        return saveString;
    }

    highlightItem(inputObj: HTMLElement, e: any) {
        if (window.JSTreeObj.currentlyActiveItem) window.JSTreeObj.currentlyActiveItem.className = '';
        this.className = 'highlightedNodeItem';
        window.JSTreeObj.currentlyActiveItem = this;
    }

    removeHighlight() {
        if (window.JSTreeObj.currentlyActiveItem) window.JSTreeObj.currentlyActiveItem.className = '';
        window.JSTreeObj.currentlyActiveItem = false;
    }

    hasSubNodes(obj: HTMLElement) {
        var subs = obj.getElementsByTagName('LI');
        if (subs.length > 0) return true;
        return false;
    }

    deleteItem(obj1: HTMLElement, obj2: HTMLElement) {
        var message = 'Click OK to delete item ' + obj2.innerHTML;
        if (this.hasSubNodes(obj2.parentNode)) message = message + ' and it\'s sub nodes';
        if (confirm(message)) {
            this.__deleteItem_step2(obj2.parentNode);
        }
    }

    __refreshDisplay(obj: HTMLElement) {
        if (this.hasSubNodes(obj)) return;
        let img = obj.getElementsByTagName('IMG')[0];
        img.style.visibility = 'hidden';
    }

    __deleteItem_step2(obj: HTMLElement) {
        var saveString = obj.id.replace(/[^0-9]/gi, '');
        var lis = obj.getElementsByTagName('LI');
        for (let no = 0; no < lis.length; no++) {
            saveString = saveString + ',' + lis[no].id.replace(/[^0-9]/gi, '');
        }
        let ajaxIndex = window.JSTreeObj.ajaxObjects.length;
        window.JSTreeObj.ajaxObjects[ajaxIndex].setVar("deleteIds", saveString);
        window.JSTreeObj.__deleteComplete(ajaxIndex, obj);
    }

    __deleteComplete(ajaxIndex: number, obj: HTMLElement) {
        if (this.ajaxObjects[ajaxIndex].response != 'OK') {
            alert('ERROR WHEN TRYING TO DELETE NODE: ' + this.ajaxObjects[ajaxIndex].response);
        } else {
            let parentRef = obj.parentNode.parentNode;
            obj.parentNode.removeChild(obj);
            this.__refreshDisplay(parentRef);
        }
    }

    __renameComplete(ajaxIndex: number) {
        if (this.ajaxObjects[ajaxIndex].response != 'OK') {
            alert('ERROR WHEN TRYING TO RENAME NODE: ' + this.ajaxObjects[ajaxIndex].response);
        }
    }

    __saveTextBoxChanges(e: any, inputObj: HTMLInputElement) {
        if (!inputObj && this) inputObj = this;
        if (document.all) e = event;
        if (e.keyCode && e.keyCode == 27) {
            window.JSTreeObj.__cancelRename(e, inputObj);
            return;
        }
        inputObj.style.display = 'none';
        inputObj.nextSibling.style.visibility = 'visible';
        if (inputObj.value.length > 0) {
            inputObj.nextSibling.innerHTML = inputObj.value;
            if (window.JSTreeObj.renameState != window.JSTreeObj.RENAME_STATE_BEGIN) {
                return;
            }
            window.JSTreeObj.renameState = window.JSTreeObj.RENAME_STATE_REQUEST_SENDED;
            let ajaxIndex = window.JSTreeObj.ajaxObjects.length;
            window.JSTreeObj.ajaxObjects[ajaxIndex].setVar("renameId", inputObj.parentNode.id.replace(/[^0-9]/gi, ''));
            window.JSTreeObj.ajaxObjects[ajaxIndex].setVar("newName", inputObj.value);
            window.JSTreeObj.__renameComplete(ajaxIndex);
        }
    }

    __cancelRename(e: any, inputObj: HTMLInputElement) {
        window.JSTreeObj.renameState = window.JSTreeObj.RENAME_STATE_CANCELD;
        if (!inputObj && this) inputObj = this;
        inputObj.value = window.JSTreeObj.helpObj.innerHTML;
        inputObj.nextSibling.innerHTML = window.JSTreeObj.helpObj.innerHTML;
        inputObj.style.display = 'none';
        inputObj.nextSibling.style.visibility = 'visible';
    }

    __renameCheckKeyCode(e: any) {
        if (document.all) e = event;
        if (e.keyCode == 13) {
            window.JSTreeObj.__saveTextBoxChanges(false, this);
        }
        if (e.keyCode == 27) {
            window.JSTreeObj.__cancelRename(false, this);
        }
    }

    __createTextBox(obj: HTMLElement) {
        let textBox = document.createElement('INPUT');
        textBox.className = 'folderTreeTextBox';
        textBox.value = obj.innerHTML;
        obj.parentNode.insertBefore(textBox, obj);
        textBox.id = 'textBox' + obj.parentNode.id.replace(/[^0-9]/gi, '');
        textBox.onblur = this.__saveTextBoxChanges;
        textBox.onkeydown = this.__renameCheckKeyCode;
        this.__renameEnableTextBox(obj);
    }

    __renameEnableTextBox(obj: HTMLElement) {
        window.JSTreeObj.renameState = window.JSTreeObj.RENAME_STATE_BEGIN;
        obj.style.visibility = 'hidden';
        obj.previousSibling.value = obj.innerHTML;
        obj.previousSibling.style.display = 'inline';
        obj.previousSibling.select();
    }

    renameItem(obj1: HTMLElement, obj2: HTMLElement) {
        this.currentItemToEdit = obj2.parentNode;
        if (!obj2.previousSibling || obj2.previousSibling.tagName.toLowerCase() != 'input') {
            this.__createTextBox(obj2);
        } else {
            this.__renameEnableTextBox(obj2);
        }
        this.helpObj.innerHTML = obj2.innerHTML;
    }

    initTree() {
        window.JSTreeObj = this;
        window.JSTreeObj.createDropIndicator();
        document.documentElement.onselectstart = window.JSTreeObj.cancelSelectionEvent;
        document.documentElement.ondragstart = window.JSTreeObj.cancelEvent;
        document.documentElement.onmousedown = window.JSTreeObj.removeHighlight;
        //Creating help object for storage of values
        this.helpObj = document.createElement('DIV');
        this.helpObj.style.display = 'none';
        document.body.appendChild(this.helpObj);
        if (this.deleteAllowed || this.renameAllowed) {
            try {
                //Create context menu
                var menuModel = new FileHierarchy_menuModel();
                if (this.deleteAllowed) menuModel.addItem(1, 'Delete', '', '', false, 'JSTreeObj.deleteItem');
                if (this.renameAllowed) menuModel.addItem(2, 'Rename', '', '', false, 'JSTreeObj.renameItem');
                menuModel.init();
                var menuModelRenameOnly = new FileHierarchy_menuModel();
                if (this.renameAllowed) menuModelRenameOnly.addItem(3, 'Rename', '', '', false, 'JSTreeObj.renameItem');
                menuModelRenameOnly.init();
                var menuModelDeleteOnly = new FileHierarchy_menuModel();
                if (this.deleteAllowed) menuModelDeleteOnly.addItem(4, 'Delete', '', '', false, 'JSTreeObj.deleteItem');
                menuModelDeleteOnly.init();
                window.refToDragDropTree = this;
                this.contextMenu = new FileHierarchy_contextMenu();
                this.contextMenu.setWidth(120);
                window.referenceToDHTMLSuiteContextMenu = this.contextMenu;
            } catch (e) { }
        }
        var nodeId = 0;
        var treeUlCounter = 0;
        var filehierarchy_tree = document.getElementById(this.idOfTree);
        var menuItems = filehierarchy_tree.getElementsByTagName('LI');
        for (let no = 0; no < menuItems.length; no++) {
            var noChildren = false;
            var tmpVar = menuItems[no].getAttribute('noChildren');
            if (!tmpVar) tmpVar = menuItems[no].noChildren;
            if (tmpVar == 'true') noChildren = true;
            var noDrag = false;
            var tmpVar = menuItems[no].getAttribute('noDrag');
            if (!tmpVar) tmpVar = menuItems[no].noDrag;
            if (tmpVar == 'true') noDrag = true;
            nodeId++;
            var subItems = menuItems[no].getElementsByTagName('UL');
            var ico = document.createElement('I');
            ico.className = this.plusIconClassName;
            //ico.onclick = window.JSTreeObj.showHideNode;
            ico.addEventListener('click', ()=>window.JSTreeObj.showHideNode(false, menuItems[no].id));
            if (subItems.length == 0) ico.style.visibility = 'hidden';
            else {
                subItems[0].id = 'tree_ul_' + treeUlCounter;
                treeUlCounter++;
            }
            var aTag : HTMLAnchorElement = menuItems[no].getElementsByTagName('A')[0];
            aTag.id = 'nodeATag' + menuItems[no].id.replace(/[^0-9]/gi, '');
            this.addEvent(aTag, 'click', ()=>this.showHideNode(false, menuItems[no].id));
            if (!noDrag) aTag.onmousedown = window.JSTreeObj.initDrag;
            if (!noChildren) aTag.onmousemove = window.JSTreeObj.moveDragableNodes;
            menuItems[no].insertBefore(ico, aTag);
            var folderIco = document.createElement('I');
            if (!noDrag) folderIco.onmousedown = window.JSTreeObj.initDrag;
            folderIco.onmousemove = window.JSTreeObj.moveDragableNodes;
            if (menuItems[no].className) {
                folderIco.className = "uil uil-file";
            } else {
                folderIco.className = "uil uil-folder-open";
            }
            menuItems[no].insertBefore(folderIco, aTag);
            if (this.contextMenu) {
                var noDelete = menuItems[no].getAttribute('noDelete');
                if (!noDelete) noDelete = menuItems[no].noDelete;
                var noRename = menuItems[no].getAttribute('noRename');
                if (!noRename) noRename = menuItems[no].noRename;

                if (noRename == 'true' && noDelete == 'true') { } else {
                    if (noDelete == 'true') this.contextMenu.attachToElement(aTag, false, menuModelRenameOnly);
                    else if (noRename == 'true') this.contextMenu.attachToElement(aTag, false, menuModelDeleteOnly);
                    else this.contextMenu.attachToElement(aTag, false, menuModel);
                }
            }
            this.addEvent(aTag, 'contextmenu', this.highlightItem);
        }
        let initExpandedNodes = this.Get_Cookie('filehierarchy_expandedNodes');
        if (initExpandedNodes) {
            var nodes = initExpandedNodes.split(',');
            for (let no = 0; no < nodes.length; no++) {
                if (nodes[no]) this.showHideNode(false, nodes[no]);
            }
        }
        document.documentElement.onmousemove = window.JSTreeObj.moveDragableNodes;
        document.documentElement.onmouseup = window.JSTreeObj.dropDragableNodes;
    }

    __addAdditionalRequestParameters(ajax: any, parameters: any) {
        for (let parameter in parameters) {
            ajax.setVar(parameter, parameters[parameter]);
        }
    }
}