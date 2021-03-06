describe('L.TileLayer.WMS.Format[\'application/vnd.ogc.gml\']', function () {
  var originalXmlParse;

  before(function() {
    originalXmlParse = L.TileLayer.WMS.Util.XML.parse;

    // Modify method to make possible to parse short GML strings.
    L.TileLayer.WMS.Util.XML.parse = function(gmlString) {
      var fullGmlString = '' +
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<root xmlns:gml="http://www.opengis.net/gml">' + gmlString + '</root>';

      return originalXmlParse(fullGmlString).firstChild;
    };
  });

  after(function() {
    // Restore original method.
    L.TileLayer.WMS.Util.XML.parse = originalXmlParse;
  });

  describe('#toGeoJSON', function () {
    it('parses gml:Polygon described by gml:posList elements with two coordinates', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:outerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="2">1.0 2.0 3.0 4.0 5.0 6.0 1.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:outerBoundaryIs>' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="2">2.0 3.0 4.0 5.0 6.0 7.0 2.0 3.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs> ' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="2">3.0 4.0 5.0 6.0 7.0 8.0 3.0 4.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs> ' +
      '</gml:Polygon>';


      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0], [3.0, 4.0], [5.0, 6.0], [1.0, 2.0]],
         [[2.0, 3.0], [4.0, 5.0], [6.0, 7.0], [2.0, 3.0]],
         [[3.0, 4.0], [5.0, 6.0], [7.0, 8.0], [3.0, 4.0]]]
      });
    });

    it('parses gml:Polygon described by gml:posList elements with three coordinates', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:outerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="3">1.0 2.0 2.0 3.0 4.0 2.0 5.0 6.0 2.0 1.0 2.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:outerBoundaryIs>' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="3">2.0 3.0 2.0 4.0 5.0 2.0 6.0 7.0 2.0 2.0 3.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs>' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="3">3.0 4.0 2.0 5.0 6.0 2.0 7.0 8.0 2.0 3.0 4.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs>' +
      '</gml:Polygon>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0, 2.0], [3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [1.0, 2.0, 2.0]],
         [[2.0, 3.0, 2.0], [4.0, 5.0, 2.0], [6.0, 7.0, 2.0], [2.0, 3.0, 2.0]],
         [[3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [7.0, 8.0, 2.0], [3.0, 4.0, 2.0]]]
      });
    });

    it('parses gml:Polygon(exterior) described by gml:posList elements with two coordinates', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:exterior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="2">1.0 2.0 3.0 4.0 5.0 6.0 1.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:exterior>' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="2">2.0 3.0 4.0 5.0 6.0 7.0 2.0 3.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior> ' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="2">3.0 4.0 5.0 6.0 7.0 8.0 3.0 4.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior> ' +
      '</gml:Polygon>';


      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0], [3.0, 4.0], [5.0, 6.0], [1.0, 2.0]],
         [[2.0, 3.0], [4.0, 5.0], [6.0, 7.0], [2.0, 3.0]],
         [[3.0, 4.0], [5.0, 6.0], [7.0, 8.0], [3.0, 4.0]]]
      });
    });

    it('parses gml:Polygon(exterior) described by gml:posList elements with three coordinates', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:exterior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="3">1.0 2.0 2.0 3.0 4.0 2.0 5.0 6.0 2.0 1.0 2.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:exterior>' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="3">2.0 3.0 2.0 4.0 5.0 2.0 6.0 7.0 2.0 2.0 3.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior>' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList  srsDimension="3">3.0 4.0 2.0 5.0 6.0 2.0 7.0 8.0 2.0 3.0 4.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior>' +
      '</gml:Polygon>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0, 2.0], [3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [1.0, 2.0, 2.0]],
         [[2.0, 3.0, 2.0], [4.0, 5.0, 2.0], [6.0, 7.0, 2.0], [2.0, 3.0, 2.0]],
         [[3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [7.0, 8.0, 2.0], [3.0, 4.0, 2.0]]]
      });
    });

    it('parses gml:Polygon described by gml:posList element with two coordinates & default srsDimension', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:outerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList>1.0 2.0 3.0 4.0 5.0 6.0 1.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:outerBoundaryIs>' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList>2.0 3.0 4.0 5.0 6.0 7.0 2.0 3.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs> ' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList>3.0 4.0 5.0 6.0 7.0 8.0 3.0 4.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs> ' +
      '</gml:Polygon>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0], [3.0, 4.0], [5.0, 6.0], [1.0, 2.0]],
         [[2.0, 3.0], [4.0, 5.0], [6.0, 7.0], [2.0, 3.0]],
         [[3.0, 4.0], [5.0, 6.0], [7.0, 8.0], [3.0, 4.0]]]
      });
    });

    it('parses gml:Polygon described by gml:posList element with three coordinates & dimension equals to 3', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:outerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList dimension="3">1.0 2.0 2.0 3.0 4.0 2.0 5.0 6.0 2.0 1.0 2.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:outerBoundaryIs>' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList dimension="3">2.0 3.0 2.0 4.0 5.0 2.0 6.0 7.0 2.0 2.0 3.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs>' +
      '  <gml:innerBoundaryIs>' +
      '    <gml:LinearRing>' +
      '      <gml:posList dimension="3">3.0 4.0 2.0 5.0 6.0 2.0 7.0 8.0 2.0 3.0 4.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:innerBoundaryIs>' +
      '</gml:Polygon>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0, 2.0], [3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [1.0, 2.0, 2.0]],
         [[2.0, 3.0, 2.0], [4.0, 5.0, 2.0], [6.0, 7.0, 2.0], [2.0, 3.0, 2.0]],
         [[3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [7.0, 8.0, 2.0], [3.0, 4.0, 2.0]]]
      });
    });

    it('parses gml:Polygon(exterior) described by gml:posList element with two coordinates & default srsDimension', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:exterior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList>1.0 2.0 3.0 4.0 5.0 6.0 1.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:exterior>' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList>2.0 3.0 4.0 5.0 6.0 7.0 2.0 3.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior> ' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList>3.0 4.0 5.0 6.0 7.0 8.0 3.0 4.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior> ' +
      '</gml:Polygon>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0], [3.0, 4.0], [5.0, 6.0], [1.0, 2.0]],
         [[2.0, 3.0], [4.0, 5.0], [6.0, 7.0], [2.0, 3.0]],
         [[3.0, 4.0], [5.0, 6.0], [7.0, 8.0], [3.0, 4.0]]]
      });
    });

    it('parses gml:Polygon(exterior) described by gml:posList element with three coordinates & dimension equals to 3', function () {
      var responseText = '' +
      '<gml:Polygon>' +
      '  <gml:exterior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList dimension="3">1.0 2.0 2.0 3.0 4.0 2.0 5.0 6.0 2.0 1.0 2.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:exterior>' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList dimension="3">2.0 3.0 2.0 4.0 5.0 2.0 6.0 7.0 2.0 2.0 3.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior>' +
      '  <gml:interior>' +
      '    <gml:LinearRing>' +
      '      <gml:posList dimension="3">3.0 4.0 2.0 5.0 6.0 2.0 7.0 8.0 2.0 3.0 4.0 2.0</gml:posList>' +
      '    </gml:LinearRing>' +
      '  </gml:interior>' +
      '</gml:Polygon>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'Polygon',
        coordinates: [[[1.0, 2.0, 2.0], [3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [1.0, 2.0, 2.0]],
         [[2.0, 3.0, 2.0], [4.0, 5.0, 2.0], [6.0, 7.0, 2.0], [2.0, 3.0, 2.0]],
         [[3.0, 4.0, 2.0], [5.0, 6.0, 2.0], [7.0, 8.0, 2.0], [3.0, 4.0, 2.0]]]
      });
    });
  });
});
