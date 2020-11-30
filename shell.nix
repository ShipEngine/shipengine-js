let pkgs = import <nixpkgs> {};

in pkgs.mkShell rec {

  buildInputs = with pkgs; [
    nodejs-12_x
  ];
}
