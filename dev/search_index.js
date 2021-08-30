var documenterSearchIndex = {"docs":
[{"location":"dev/#Developer-Notes","page":"Developer Notes","title":"Developer Notes","text":"","category":"section"},{"location":"dev/#Benchmarking","page":"Developer Notes","title":"Benchmarking","text":"","category":"section"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"You can benchmark the effect on performance of your commits using the script perf/perf.jl.","category":"page"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"First, checkout and benchmark the master branch:","category":"page"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"julia> include(\"perf.jl\")\n\njulia> df = run_benchmarks()\n\n# observe results\njulia> for g in groupby(df, :layer); println(g, \"\\n\"); end\n\njulia> @save \"perf_master_20210803_mymachine.jld2\" dfmaster=df","category":"page"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"Now checkout your branch and do the same:","category":"page"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"julia> df = run_benchmarks()\n\njulia> @save \"perf_pr_20210803_mymachine.jld2\" dfpr=df","category":"page"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"Finally, compare the results:","category":"page"},{"location":"dev/","page":"Developer Notes","title":"Developer Notes","text":"julia> @load \"perf_master_20210803_mymachine.jld2\"\n\njulia> @load \"perf_pr_20210803_mymachine.jld2\"\n\njulia> compare(dfpr, dfmaster)","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = GraphNeuralNetworks","category":"page"},{"location":"#GraphNeuralNetworks","page":"Home","title":"GraphNeuralNetworks","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for GraphNeuralNetworks.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [GraphNeuralNetworks]","category":"page"},{"location":"#GraphNeuralNetworks.ChebConv","page":"Home","title":"GraphNeuralNetworks.ChebConv","text":"ChebConv(in=>out, k; bias=true, init=glorot_uniform)\n\nChebyshev spectral graph convolutional layer.\n\nArguments\n\nin: The dimension of input features.\nout: The dimension of output features.\nk: The order of Chebyshev polynomial.\nbias: Add learnable bias.\ninit: Weights' initializer.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.EdgeConv","page":"Home","title":"GraphNeuralNetworks.EdgeConv","text":"EdgeConv(nn; aggr=max)\n\nEdge convolutional layer.\n\nArguments\n\nnn: A neural network (e.g. a Dense layer or a MLP). \naggr: An aggregate function applied to the result of message function. +, max and mean are available.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.FeaturedGraph","page":"Home","title":"GraphNeuralNetworks.FeaturedGraph","text":"FeaturedGraph(g; [graph_type, dir, num_nodes, nf, ef, gf])\nFeaturedGraph(fg::FeaturedGraph; [nf, ef, gf])\n\nA type representing a graph structure and storing also arrays  that contain features associated to nodes, edges, and the whole graph. \n\nA FeaturedGraph can be constructed out of different objects g representing the connections inside the graph, while the internal representation type is governed by graph_type.  When constructed from another featured graph fg, the internal graph representation is preserved and shared. \n\nA FeaturedGraph is a LightGraphs' AbstractGraph, therefore any functionality from the LightGraphs' graph library can be used on it.\n\nArguments\n\ng: Some data representing the graph topology. Possible type are \nAn adjacency matrix\nAn adjacency list.\nA tuple containing the source and target vectors (COO representation)\nA LightGraphs' graph.\ngraph_type: A keyword argument that specifies                the underlying representation used by the FeaturedGraph.                Currently supported values are \n:coo. Graph represented as a tuple (source, target), such that the k-th edge          connects the node source[k] to node target[k].         Optionally, also edge weights can be given: (source, target, weights).\n:sparse. A sparse adjacency matrix representation.\n:dense. A dense adjacency matrix representation.  \nDefault :coo.\ndir. The assumed edge direction when given adjacency matrix or adjacency list input data g.        Possible values are :out and :in. Defaul :out.\nnum_nodes. The number of nodes. If not specified, inferred from g. Default nothing.\nnf: Node features. Either nothing, or an array whose last dimension has size num_nodes. Default nothing.\nef: Edge features. Either nothing, or an array whose last dimension has size num_edges. Default nothing.\ngf: Global features. Default nothing. \n\nUsage.\n\nusing Flux, GraphNeuralNetworks\n\n# Construct from adjacency list representation\ng = [[2,3], [1,4,5], [1], [2,5], [2,4]]\nfg = FeaturedGraph(g)\n\n# Number of nodes and edges\nfg.num_nodes  # 5\nfg.num_edges  # 10 \n\n# Same graph in COO representation\ns = [1,1,2,2,2,3,4,4,5,5]\nt = [2,3,1,4,5,3,2,5,2,4]\nfg = FeaturedGraph((s, t))\nfg = FeaturedGraph(s, t) # other convenience constructor\n\n# From a LightGraphs' graph\nfg = FeaturedGraph(erdos_renyi(100, 20))\n\n# Copy featured graph while also adding node features\nfg = FeaturedGraph(fg, nf=rand(100, 5))\n\n# Send to gpu\nfg = fg |> gpu\n\n# Collect edges' source and target nodes.\n# Both source and target are vectors of length num_edges\nsource, target = edge_index(fg)\n\nSee also graph, edge_index, node_feature, edge_feature, and global_feature \n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.GATConv","page":"Home","title":"GraphNeuralNetworks.GATConv","text":"GATConv(in => out;\n        heads=1,\n        concat=true,\n        init=glorot_uniform    \n        bias=true, \n        negative_slope=0.2)\n\nGraph attentional layer.\n\nArguments\n\nin: The dimension of input features.\nout: The dimension of output features.\nbias::Bool: Keyword argument, whether to learn the additive bias.\nheads: Number attention heads \nconcat: Concatenate layer output or not. If not, layer output is averaged over the heads.\nnegative_slope::Real: Keyword argument, the parameter of LeakyReLU.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.GCNConv","page":"Home","title":"GraphNeuralNetworks.GCNConv","text":"GCNConv(in => out, σ=identity; bias=true, init=glorot_uniform)\n\nGraph convolutional layer.\n\nArguments\n\nin: The dimension of input features.\nout: The dimension of output features.\nσ: Activation function.\nbias: Add learnable bias.\ninit: Weights' initializer.\n\nThe input to the layer is a node feature array X  of size (num_features, num_nodes).\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.GINConv","page":"Home","title":"GraphNeuralNetworks.GINConv","text":"GINConv(nn; eps = 0f0)\n\nGraph Isomorphism Network.\n\nArguments\n\nnn: A neural network/layer.\neps: Weighting factor.\n\nThe definition of this is as defined in the original paper, Xu et. al. (2018) https://arxiv.org/abs/1810.00826.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.GatedGraphConv","page":"Home","title":"GraphNeuralNetworks.GatedGraphConv","text":"GatedGraphConv(out, num_layers; aggr=+, init=glorot_uniform)\n\nGated graph convolution layer.\n\nArguments\n\nout: The dimension of output features.\nnum_layers: The number of gated recurrent unit.\naggr: An aggregate function applied to the result of message function. +, -,\n\n*, /, max, min and mean are available.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.GlobalPool","page":"Home","title":"GraphNeuralNetworks.GlobalPool","text":"GlobalPool(aggr, dim...)\n\nGlobal pooling layer.\n\nIt pools all features with aggr operation.\n\nArguments\n\naggr: An aggregate function applied to pool all features.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.GraphConv","page":"Home","title":"GraphNeuralNetworks.GraphConv","text":"GraphConv(in => out, σ=identity, aggr=+; bias=true, init=glorot_uniform)\n\nGraph neural network layer.\n\nArguments\n\nin: The dimension of input features.\nout: The dimension of output features.\nσ: Activation function.\naggr: An aggregate function applied to the result of message function. +, -,\n\n*, /, max, min and mean are available.\n\nbias: Add learnable bias.\ninit: Weights' initializer.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.LocalPool","page":"Home","title":"GraphNeuralNetworks.LocalPool","text":"LocalPool(aggr, cluster)\n\nLocal pooling layer.\n\nIt pools features with aggr operation accroding to cluster. It is implemented with scatter operation.\n\nArguments\n\naggr: An aggregate function applied to pool all features.\ncluster: An index structure which indicates what features to aggregate with.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.MessagePassing","page":"Home","title":"GraphNeuralNetworks.MessagePassing","text":"MessagePassing\n\nThe abstract type from which all message passing layers are derived.\n\nRelated methods are propagate, message, update, update_edge, and update_global. \n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.TopKPool","page":"Home","title":"GraphNeuralNetworks.TopKPool","text":"TopKPool(adj, k, in_channel)\n\nTop-k pooling layer.\n\nArguments\n\nadj: Adjacency matrix  of a graph.\nk: Top-k nodes are selected to pool together.\nin_channel: The dimension of input channel.\n\n\n\n\n\n","category":"type"},{"location":"#GraphNeuralNetworks.add_self_loops-Tuple{FeaturedGraph{var\"#s10\"} where var\"#s10\"<:(Tuple{T, T, V} where {T<:(AbstractVector{T} where T), V})}","page":"Home","title":"GraphNeuralNetworks.add_self_loops","text":"add_self_loops(fg::FeaturedGraph)\n\nReturn a featured graph with the same features as fg but also adding edges connecting the nodes to themselves.\n\n\n\n\n\n","category":"method"},{"location":"#GraphNeuralNetworks.bypass_graph","page":"Home","title":"GraphNeuralNetworks.bypass_graph","text":"bypass_graph(nf_func, ef_func, gf_func)\n\nBypassing graph in FeaturedGraph and let other layer process (node, edge and global)features only.\n\n\n\n\n\n","category":"function"},{"location":"#GraphNeuralNetworks.edge_feature-Tuple{FeaturedGraph}","page":"Home","title":"GraphNeuralNetworks.edge_feature","text":"edge_feature(fg::FeaturedGraph)\n\nReturn the edge features of fg.\n\n\n\n\n\n","category":"method"},{"location":"#GraphNeuralNetworks.edge_index-Tuple{FeaturedGraph{var\"#s11\"} where var\"#s11\"<:(Tuple{T, T, V} where {T<:(AbstractVector{T} where T), V})}","page":"Home","title":"GraphNeuralNetworks.edge_index","text":"edge_index(fg::FeaturedGraph)\n\nReturn a tuple containing two vectors, respectively storing  the source and target nodes for each edges in fg.\n\ns, t = edge_index(fg)\n\n\n\n\n\n","category":"method"},{"location":"#GraphNeuralNetworks.global_feature-Tuple{FeaturedGraph}","page":"Home","title":"GraphNeuralNetworks.global_feature","text":"global_feature(fg::FeaturedGraph)\n\nReturn the global features of fg.\n\n\n\n\n\n","category":"method"},{"location":"#GraphNeuralNetworks.graph-Tuple{FeaturedGraph}","page":"Home","title":"GraphNeuralNetworks.graph","text":"graph(fg::FeaturedGraph)\n\nReturn the underlying implementation of the graph structure of fg, either an adjacency matrix or an edge list in the COO format.\n\n\n\n\n\n","category":"method"},{"location":"#GraphNeuralNetworks.message","page":"Home","title":"GraphNeuralNetworks.message","text":"message(mp::MessagePassing, x_i, x_j, [e_ij, u])\n\nMessage function for the message-passing scheme, returning the message from node j to node i . In the message-passing scheme. the incoming messages  from the neighborhood of i will later be aggregated in order to update the features of node i.\n\nBy default, the function returns x_j. Layers subtyping MessagePassing should  specialize this method with custom behavior.\n\nArguments\n\nmp: A MessagePassing layer.\nx_i: Features of the central node i.\nx_j: Features of the neighbor j of node i.\ne_ij: Features of edge (i, j).\nu: Global features.\n\nSee also update and propagate.\n\n\n\n\n\n","category":"function"},{"location":"#GraphNeuralNetworks.node_feature-Tuple{FeaturedGraph}","page":"Home","title":"GraphNeuralNetworks.node_feature","text":"node_feature(fg::FeaturedGraph)\n\nReturn the node features of fg.\n\n\n\n\n\n","category":"method"},{"location":"#GraphNeuralNetworks.normalized_laplacian","page":"Home","title":"GraphNeuralNetworks.normalized_laplacian","text":"normalized_laplacian(fg, T=Float32; selfloop=false, dir=:out)\n\nNormalized Laplacian matrix of graph g.\n\nArguments\n\nfg: A FeaturedGraph.\nT: result element type.\nselfloop: adding self loop while calculating the matrix.\ndir: the edge directionality considered (:out, :in, :both).\n\n\n\n\n\n","category":"function"},{"location":"#GraphNeuralNetworks.propagate","page":"Home","title":"GraphNeuralNetworks.propagate","text":"propagate(mp::MessagePassing, fg::FeaturedGraph, aggr)\npropagate(mp::MessagePassing, fg::FeaturedGraph, E, X, u, aggr)\n\nPerform the sequence of operation implementing the message-passing scheme and updating node, edge, and global features X, E, and u respectively.\n\nThe computation involved is the following:\n\nM = compute_batch_message(mp, fg, E, X, u) \nE = update_edge(mp, M, E, u)\nM̄ = aggregate_neighbors(mp, aggr, fg, M)\nX = update(mp, M̄, X, u)\nu = update_global(mp, E, X, u)\n\nCustom layers sub-typing MessagePassing typically call define their own update and message function, than call this method in the forward pass:\n\nfunction (l::GNNLayer)(fg, X)\n    ... some prepocessing if needed ...\n    E = nothing\n    u = nothing\n    propagate(l, fg, E, X, u, +)\nend\n\nSee also message and update.\n\n\n\n\n\n","category":"function"},{"location":"#GraphNeuralNetworks.scaled_laplacian","page":"Home","title":"GraphNeuralNetworks.scaled_laplacian","text":"scaled_laplacian(fg, T=Float32; dir=:out)\n\nScaled Laplacian matrix of graph g, defined as hatL = frac2lambda_max L - I where L is the normalized Laplacian matrix.\n\nArguments\n\nfg: A FeaturedGraph.\nT: result element type.\ndir: the edge directionality considered (:out, :in, :both).\n\n\n\n\n\n","category":"function"},{"location":"#GraphNeuralNetworks.update","page":"Home","title":"GraphNeuralNetworks.update","text":"update(mp::MessagePassing, m̄, x, [u])\n\nUpdate function for the message-passing scheme, returning a new set of node features x′ based on old  features x and the incoming message from the neighborhood aggregation m̄.\n\nBy default, the function returns m̄. Layers subtyping MessagePassing should  specialize this method with custom behavior.\n\nArguments\n\nmp: A MessagePassing layer.\nm̄: Aggregated edge messages from the message function.\nx: Node features to be updated.\nu: Global features.\n\nSee also message and propagate.\n\n\n\n\n\n","category":"function"}]
}
