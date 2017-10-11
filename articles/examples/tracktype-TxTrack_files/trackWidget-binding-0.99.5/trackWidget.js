HTMLWidgets.widget({

    name: 'trackWidget',

    type: 'output',

    factory: function(el, width, height) {
        
        // Some util functions
        var tnr = {};
        
        tnr.tooltip_callback = function (header, entries) {
            
            // entries may be a scalar variable, but we need an array
            if (typeof entries != "object") {
                entries = [entries];
            }
            
            var ans = function (d) {
                var tooltip_rows = [];
                for (var i = 0; i < entries.length; i++) {
                    var tooltip_row = {
                        "label": entries[i],
                        "value": d.tooltip[entries[i]]
                    };
                    tooltip_rows.push(tooltip_row);
                }
                
                tnt.tooltip.table()
                    .width(180)
                    .call(this, {
                        header: header,
                        rows: tooltip_rows
                    });
            };
            return ans;
        };
        
        tnr.cp_tx_color_to_exon = function (data) {
            var txData = data;
            
            for (var i = 0; i < txData.length; i++) {
                var col = txData[i].color;
                var exons = txData[i].exons;
                for (var j = 0; j < exons.length; j++) {
                    exons[j].color = col;
                }
            }
            return txData;
        };
        
        //tnr.add_index = function (data) {
        //    var d = data;
        //    for (var i = 0; i < data.length; i++) {
        //        d[i][".index."] = i;
        //    }
        //    return d;
        //};

        tnr.scale_val = function (data, domain) {
            var scalefun = d3.scale.linear().domain(domain).range([0, 1]);
            for (var i = 0; i < data.length; i++) {
                data[i].val = scalefun(data[i].val);
            }
            console.log(data); // temporary
            return data;
        };
        
        tnr.range_data_retriever = function (data, full) {
            // TODO:  We may sort the data here and provide fast search
            var rangeData = data;
            
            // Return a closure as the data retriever
            var ans = function (loc) {
                if (full) {
                    return rangeData;
                }
                var min = loc.from;
                var max = loc.to;
                var ans = [];
                for (var i = 0; i < rangeData.length; i++) {
                    var row = rangeData[i];
                    if (row.start <= max && row.end >= min) {
                        ans.push(row);
                    }
                }
                return ans;
            };
            return ans;
        };
        
        tnr.pos_data_retriever = function (data, full) {
            var posData = data;
            var ans = function (loc) {
                if (full) {
                    return posData;
                }
                var min = loc.from;
                var max = loc.to;
                var ans = [];
                for (var i = 0; i < posData.length; i++) {
                    var row = posData[i];
                    if (row.pos <= max && row.pos >= min) {
                        ans.push(row);
                    }
                }
                return ans;
            };
            return ans;
        };

        tnr.composite_data_retriever = function () {

            var ans = {
                func_array: [],
                add: function (ref, func) {
                    this.func_array.push({
                        ref: ref,
                        func: func
                    });
                    return this;
                },
                done: function () {
                    var func_array = this.func_array;
                    var ans = function (loc) {
                        var ret_data = {};
                        for (var i = 0; i < func_array.length; i++) {
                            var func = func_array[i];
                            ret_data[func.ref] = func.func(loc);
                        }
                        return ret_data;
                    };
                    return ans;
                }
            };

            return ans;
        };
        
        
        // Define shared variables for this instance
        var tntins = null;
        var initial_width = width;
        
        return {
            
            renderValue: function(x) {
                
                // Code to render the widget    ----------------
                
                tntins = eval(x.tntdef);
                
                // Set the initial width
                tntins.width(initial_width);
                
                tntins(el);
                tntins.start();
                
                // TODO: In the future, we may implement interface to add/update data to
                //       an existing tnt instance (with shiny), and with proper transition.
            },
            
            resize: function(width, height) {
                // TODO: code to re-render the widget with a new size
                tntins.width(width);
            }
        };
    }
});

