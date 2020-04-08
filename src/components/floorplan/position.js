import LM from "ml-curve-fitting";

var Matrix = LM.Matrix;
var math   = Matrix.algebra;
var euclidean = function(t,p,c){
    var rows = t.rows;
    var result = new Matrix(t.rows, 1);
    for(var i = 0; i < rows; i++){
       result[i][0] = Math.sqrt(Math.pow(t[i][0]-p[0][0],2)+Math.pow(t[i][1]-p[1][0],2));
    }
    return result;
};

export const locate  = (beacons, b, px_meter) => {

    const trilat = (data, allowedDist) => {
        var nbPoints = data.length;
        var t = math.matrix(nbPoints,2);
        var y_data = math.matrix(nbPoints, 1);
        for(var i = 0; i < nbPoints; i++){
            t[i][0] = data[i][0];
            t[i][1] = data[i][1];
            y_data[i][0] = data[i][2];
        }
        var weight = [1];
        var opts = [ 2, 100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2, 11, 9, 1 ];
        var consts = [];
        var Xs = [ data[0][0], data[1][0], data[2][0] ];
        var Ys = [ data[0][1], data[1][1], data[2][1] ];
        var minX = Math.min.apply(Math, Xs);
        var minY = Math.min.apply(Math, Ys);
        var maxX = Math.max.apply(Math, Xs);
        var maxY = Math.max.apply(Math, Ys);
        var avgX = ( Xs[0] + Xs[1] + Xs[2] ) / 3;
        var avgY = ( Ys[0] + Ys[1] + Ys[2] ) / 3;
        var ad   = allowedDist || 0;
        var p_init = math.matrix([[avgX], [avgY]]);
        var p_min  = math.matrix([[minX-ad], [minY-ad]]);
        var p_max  = math.matrix([[maxX+ad], [maxY-ad]]);
        var p_fit  = LM.optimize(euclidean,p_init,t,y_data,weight,-0.01,p_min,p_max,consts,opts);
        p_fit = p_fit.p;
        return [ p_fit[0][0], p_fit[1][0] ];
    }
    const calculateDistance = (rssi) => {
        let P = -69;
        let n = 3;
        let d = Math.pow(10, ((P-rssi) / (10*n)) );
        return d*px_meter;
    }
    let input = [
        [ parseInt(b[0].posicao.x, 10), parseInt(b[0].posicao.y, 10), calculateDistance(beacons.b[0].r)],
        [ parseInt(b[1].posicao.x, 10), parseInt(b[1].posicao.y, 10), calculateDistance(beacons.b[1].r)],
        [ parseInt(b[2].posicao.x, 10), parseInt(b[2].posicao.y, 10), calculateDistance(beacons.b[2].r)]
    ];
    let output = trilat(input);
    let coords = {
        x: parseInt(output[0], 10),
        y: parseInt(output[1], 10)
    };
    return coords;
};