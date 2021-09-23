var Val = {
    a: ''
};
for (var key in Val) {
    console.log(key);
}
var Cl = /** @class */ (function () {
    function Cl(vals) {
        this.a = vals.a ? vals.a : 'def';
    }
    return Cl;
}());
var ClObj = {};
console.log(ClObj);
