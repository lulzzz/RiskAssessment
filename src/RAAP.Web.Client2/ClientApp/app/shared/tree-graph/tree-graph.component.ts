import { Component, ElementRef, OnInit, OnChanges, Input } from "@angular/core";
import { D3Service, D3, HierarchyPointNode, HierarchyNode, TreeLayout } from "d3-ng2-service";

@Component({
    selector: 'app-tree-graph',
    template: '<svg></svg>',
    styleUrls: ['./tree-graph.component.css']
})
export class TreeGraphComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() reverse: boolean = false;
    private d3: D3;
    parentNativeElement: any;
    width: number = 1000;
    height: number = 500;

    constructor(element: ElementRef, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnInit(): void {
        this.drawGraph();
    }

    ngOnChanges(): void {
        this.removeGraph();
        this.drawGraph();
    }

    removeGraph() {
        let d3 = this.d3;
        d3.select(this.parentNativeElement).select("svg").selectAll("*").remove();
    }

    drawGraph() {
        let d3 = this.d3;
        let treemap: TreeLayout<any> = d3.tree().size([this.height, this.width]);
        let nodes: HierarchyNode<any> = d3.hierarchy(this.data, d => d.children)
        let nodePoints: HierarchyPointNode<any> = treemap(nodes);
        let svg = d3.select(this.parentNativeElement).select("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("preserveAspectRatio", "xMaxYMin meet");
        if (this.reverse) {
            svg.attr("transform", "scale(-1, 1)")
        }
        let g = svg.append("g").attr("transform", "scale(0.8) translate(100, 50)");
        let link = g.selectAll(".link").data(nodePoints.descendants().slice(1))
            .enter().append("path").attr("class", "link")
            .attr("d", d => {
                return `M${d.y},${d.x}C${(d.y + (d.parent ? d.parent.y : d.y)) / 2},${d.x} ${(d.y + (d.parent ? d.parent.y : d.y)) / 2},${(d.parent ? d.parent.x : d.x)} ${(d.parent ? d.parent.y : d.y)},${(d.parent ? d.parent.x : d.x)}`
            })
        let node = g.selectAll(".node")
            .data(nodePoints.descendants())
            .enter().append("g")
            .attr("class", d => {
                return "node" + (d.children ? " node--internal" : " node--leaf")
            })
            .attr("transform", d => {
                return `translate(${d.y}, ${d.x})`
            });
        node.append("circle").attr("r", 4);
        let text = node.append("text").attr("dy", "-0.8em").attr("x", "0")
            .style("text-anchor", d => {
                return "middle";
            })
            .text(d => { return d.data.name })
        if (this.reverse) {
            text.attr("transform", "scale(-1, 1)")
        }
    }
}