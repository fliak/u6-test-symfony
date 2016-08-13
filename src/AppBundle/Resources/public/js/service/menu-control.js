/**
 * Created by fliak on 11.8.16.
 */

app.services.menuControl = function(timer)   {

    return {
        closeTimers: {},

        cancelClose: function(menu) {
            var menuId = menu.getAttribute('menu-id');
            if (this.closeTimers[menuId] !== undefined) {
                this.closeTimers[menuId].cancel();
                this.closeTimers[menuId] = undefined;
            }
        },

        open: function(item)    {
            var nestedMenu = item.querySelector(':scope > menu');

            if (nestedMenu) {
                nestedMenu.classList.toggle('focused', true);
                this.cancelClose(nestedMenu);
            }

            var self = this;

            this.getParentRoots(item).forEach(function(root) {
                root.classList.toggle('focused', true);
                self.cancelClose(root);
            });

        },

        getParentRoots: function(item) {
            var ancestorSet = [];
            var ancestor = item;

            do {
                if (ancestor.parentNode.tagName.toLowerCase() === 'menu') {
                    ancestorSet.push(ancestor.parentNode);
                }
                ancestor = ancestor.parentNode;
            } while(!ancestor.classList.contains('top') && ancestor.tagName.toLowerCase() !== 'body')

            return ancestorSet;
        },

        close: function (item) {
            var menu = item.querySelector(':scope > menu');

            if (menu) {
                this.placeTimer(menu.getAttribute('menu-id'), function()  {
                    menu.classList.toggle('focused', false);
                });
            }

            var self = this;

            this.getParentRoots(item).forEach(function(root) {
                self.placeTimer(root.getAttribute('menu-id'), function()  {
                    root.classList.toggle('focused', false);
                });
            });
        },

        placeTimer: function(id, fn)    {
            if (this.closeTimers[id] !== undefined) {
                this.closeTimers[id].cancel();
            }

            this.closeTimers[id] = timer.start(fn, 600)
        }
    };
    
};