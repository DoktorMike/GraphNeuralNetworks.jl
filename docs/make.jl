using GraphNeuralNetworks
using Documenter

DocMeta.setdocmeta!(GraphNeuralNetworks, :DocTestSetup, :(using GraphNeuralNetworks); recursive=true)

makedocs(;
    modules=[GraphNeuralNetworks],
    sitename = "GraphNeuralNetworks.jl",
    pages=[
        "Home" => "index.md",
        "Developer Notes" => "dev.md",
    ],
)

deploydocs(repo="github.com/CarloLucibello/GraphNeuralNetworks.jl.git")