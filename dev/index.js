var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ETreeList;
(function (ETreeList) {
    ETreeList["Prop"] = "Prop";
    ETreeList["Second"] = "Second";
})(ETreeList || (ETreeList = {}));
var TREE_IS_LOADING = 'TREE/IS-LOADING';
var TREE_IS_VISIBLE = 'TREE/IS-VISIBLE';
var treeReducer = function (curState, action) {
    switch (action.type) {
        case TREE_IS_LOADING: {
            var newState = __assign({}, curState);
            newState[action.listKey].isLoading = action.loading;
            newState[action.listKey].list = action.list;
            return newState;
        }
        case TREE_IS_VISIBLE: {
            var newState = __assign({}, curState);
            newState[action.listKey].isVisible = action.visible;
            newState[action.listKey].list = action.list;
            return newState;
        }
        default:
            return curState;
    }
};
