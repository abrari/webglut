
//class for VBO's
// data:       this is the vertex data,  a regular array should be passed, with all the vertex data
// color_data: this is the color data, which defines color for each vertices (in R, G, B, A)
//             every vertices have to assigned to a color
//
// Here is an example, sets up a VBO for a very simple triangle.
// i.e. just 3 vertices (0,1,0), (-1,-1,0), and (1,-1,-)
// with colors: (1,0,0,1), (0,1,0,1), (0,0,1,1)
//
// var verts = [0,1,0, -1,-1,0, 1,-1,0];
// var colors = [1,0,0,1, 0,1,0,1, 0,0,1,1];
// var vbo = new VertexBuffer(verts, colors);

var VertexBuffer = Class.extend({
	init: function(data, color_data){
		this.buffer = gl.createBuffer();
		this.color_buffer = gl.createBuffer();
		this.item_size = 3; // x, y, z
		this.color_size = 4; // r, g, b, a

        if(data) this.set_data(data, color_data);
	},

	set_data: function(data, color_data){
		this.data = data;
		this.color_data = color_data;
		
		this.num_items = this.data.length/this.item_size;
		this.pack();
	},

	pack: function(){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.data), gl.STATIC_DRAW);
		
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_data), gl.STATIC_DRAW);			
	},

	draw: function(shader, mode){
		if (mode == undefined) mode = gl.TRIANGLES;
		shader.enable();
					          
        // Vertex buffer  
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.vertexAttribPointer(shader.vertexPosition, this.item_size, gl.FLOAT, false, 0, 0);
		
		// Color buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_buffer);
        gl.vertexAttribPointer(shader.vertexColor, this.color_size, gl.FLOAT, false, 0, 0);		
		
		gl.drawArrays(mode, 0, this.num_items);
	}
});
