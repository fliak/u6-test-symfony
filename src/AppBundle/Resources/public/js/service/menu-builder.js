/**
 * Created by fliak on 10.8.16.
 */


app.services.menuBuilder = function()    {

    /**
     * Convert plain tree to nested structure in pass
     *
     * @param plainTree
     *
     * @return object
     */
    var buildTree = function(plainTree) {
        var i, element, elementIndex = {}, tree = {};

        //build elements index and top row
        for (i = 0; i < plainTree.length; i++)  {
            element = plainTree[i];

            elementIndex[element.id] = element;
        }

        for (i = 0; i < plainTree.length; i++)  {
            element = plainTree[i];

            elementIndex[element.id] = element;

            if (element.parent_id)  {
                var parentElement = elementIndex[element.parent_id];
                if (parentElement === undefined) throw "Broken menu structure. Missing parent for element `" + element.id + '`';
                if (parentElement.leafs === undefined) parentElement.leafs = {};

                parentElement.leafs[element.id] = element;
            }
            else    {
                //top row
                tree[element.id] = element;
            }

        }

        return tree;
    };


    var recursiveDomBuilder = function(tree, leafTemplate, branchTemplate, containerElement, deepIndex) {
        deepIndex = deepIndex || 1;

        Object.keys(tree).forEach(function (key) {
            var value = tree[key], nestedStructure, element, branchElement;

            element = leafTemplate(value);

            if (value.leafs !== undefined)    {

                branchElement = branchTemplate(value);
                branchElement.classList.add('level-' + deepIndex);

                recursiveDomBuilder(value.leafs, leafTemplate, branchTemplate, branchElement, deepIndex + 1)


                element.appendChild(branchElement);

            }

            containerElement.appendChild(element);

        });

        return containerElement;
    };


    return function(menuStructure, container)   {
        console.log('structure', menuStructure, container);

        var tree = buildTree(menuStructure);

        recursiveDomBuilder(tree, function(element) {

            var li = document.createElement('li');
            li.setAttribute('element-id', element.id);
            li.innerHTML = element.title;

            return li;

        }, function(branchElement)   {

            var menu = document.createElement('menu');
            menu.setAttribute('menu-id', branchElement.id);
            menu.className = 'nested'

            return menu;

        }, container);


        console.log('tree', tree, container);


    }
    
};