var expect = require('chai').expect;
var OutlineParser = require('../src/OutlineParser');

describe('OutlineParser', function() {
  it('handles a single item', function() {
    expect(OutlineParser('Homework'))
    .to.eql([
      {name:'Homework', children:[]}
    ]);
  });

  it('handles an empty input', function() {
    expect(OutlineParser(''))
    .to.eql([]);
  });

  it('handles a simple list', function() {
    expect(OutlineParser('A\nB\nC'))
    .to.eql([
      {name:'A', children:[]},
      {name:'B', children:[]},
      {name:'C', children:[]}
    ]);
  });

  it('ignores blank lines', function() {
    expect(OutlineParser('A\n\nB\nC'))
    .to.eql([
      {name:'A', children:[]},
      {name:'B', children:[]},
      {name:'C', children:[]}
    ]);
  });

  it('trims blank lines', function() {
    expect(OutlineParser('\n\nA\nB\nC\n\n'))
    .to.eql([
      {name:'A', children:[]},
      {name:'B', children:[]},
      {name:'C', children:[]}
    ]);
  });

  it('handles one child element', function() {
    expect(OutlineParser('A\n a1'))
    .to.eql([
      {name: 'A', children: [
        {name:'a1', children:[]}
      ]}
    ]);
  });

  it('handles multiple children', function() {
    expect(OutlineParser('A\n a1\n a2\n a3'))
    .to.eql([
      {name: 'A', children: [
        {name:'a1', children:[]},
        {name:'a2', children:[]},
        {name:'a3', children:[]}
      ]}
    ]);
  });

  it('handles multiple parents', function() {
    expect(OutlineParser('A\n a1\n a2\nB\nC\n c1'))
    .to.eql([
      {name: 'A', children: [
        {name:'a1', children:[]},
        {name:'a2', children:[]}
      ]},
      {name:'B', children:[]},
      {name: 'C', children: [
        {name:'c1', children:[]}
      ]}
    ]);
  });

  it('handles grandchildren', function() {
    expect(OutlineParser('A\n a1\n  a1i'))
    .to.eql([
      {name: 'A', children: [
        {name: 'a1', children: [
          {name:'a1i', children:[]}
        ]}
      ]}
    ]);
  });

  it('handles grandchildren for parents besides the first', function() {
    expect(OutlineParser('A\nB\n b1\n  b1i'))
    .to.eql([
      {name: 'A', children: []},
      {name: 'B', children: [
        {name: 'b1', children: [
          {name: 'b1i', children: []}
        ]}
      ]}
    ]);
  });

  it('handled great-grandchildren', function() {
    expect(OutlineParser('A\n a1\n  a1i\n   a1iA'))
    .to.eql([
      {name: 'A', children: [
        {name: 'a1', children: [
          {name: 'a1i', children: [
            {name: 'a1iA', children: []}
          ]}
        ]}
      ]}
    ]);
  });
});