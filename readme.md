# easy-log

A debugging module that grew out of a dissatisfaction of all other current modules for logging and debugging. Features all other dubugging features I could find, and some additional configurations, stack tracing, and options.

*Notice that this package is still not officially released, and is under heavy development. All releases should be stable, but are currently only tested on a Mac, use at your own risk, currently*

## Installation

```
npm i easy-log
```

## Usage

Using `const logger = require('easy-log')('app')` exposes a function that will name-space a logging function, which means the specified logger will only output when that name-space is specified, either in code or in the run script. Each logger is highly customizable, individually of each other. You can set, change, and toggle colors, formatting, stack tracing, and even the entire logger itself. Read on for specific syntax and example of how to do so.

## Base Example

A basic use case with a few different name-spaced loggers, and a couple different files

app.js
```js
const express = require('express')
    , basicLog = require('../../')('app:basic')
    , dbLog = require('../../')('app:db')
    , mongoose = require('mongoose')

const app = express();
const name = "Example Application";

basicLog(`Booting ${name}`);

mongoose.connect("mongodb://localhost/example", { useNewUrlParser: true })
    .then(() => { dbLog(`app.js -> Mongod DB connected successfully`); })
    .catch((err) => { dbLog(`app.js -> Mongo DB could not connect: ${err}`); });

const port = process.env.PORT || 3000;

app.listen(port, () => { basicLog(`App listening on port ${port}`); });

// Use some imaginary worker file
require('./worker');
```

worker.js
```js
const dbLogger = require('../../')('app:db')
    , basicLogger = require('../../')('app:basic');

function dbWork() {
    dbLogger('doing lots of uninteresting database work');
    setTimeout(dbWork, Math.random() * 1000);
}

dbWork();

function basicWork() {
    basicLogger('doing some basic work');
    setTimeout(basicWork, Math.random() * 2000);
}

basicWork();
```

run `DEBUG=app:* node app.js`

**Result**
***

![basic_use_case](https://user-images.githubusercontent.com/31779571/46962930-5f636a00-d072-11e8-8387-f3ab7281cfe2.png)

## Color Codes

Below is a table of supported color codes for you to choose from when configuring colors

<table>
  <tr>
    <td>1</td><td><img src="http://medyk.org/colors/800000.png" width="20" height="20" /></td>
    <td>2</td><td><img src="http://medyk.org/colors/008000.png" width="20" height="20" /></td>
    <td>3</td><td><img src="http://medyk.org/colors/808000.png" width="20" height="20" /></td>
    <td>4</td><td><img src="http://medyk.org/colors/000080.png" width="20" height="20" /></td>
    <td>5</td><td><img src="http://medyk.org/colors/800080.png" width="20" height="20" /></td>
    <td>6</td><td><img src="http://medyk.org/colors/008080.png" width="20" height="20" /></td>
    <td>7</td><td><img src="http://medyk.org/colors/c0c0c0.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>8</td><td><img src="http://medyk.org/colors/808080.png" width="20" height="20" /></td>
    <td>9</td><td><img src="http://medyk.org/colors/ff0000.png" width="20" height="20" /></td>
    <td>10</td><td><img src="http://medyk.org/colors/00ff00.png" width="20" height="20" /></td>
    <td>11</td><td><img src="http://medyk.org/colors/ffff00.png" width="20" height="20" /></td>
    <td>12</td><td><img src="http://medyk.org/colors/0000ff.png" width="20" height="20" /></td>
    <td>13</td><td><img src="http://medyk.org/colors/ff00ff.png" width="20" height="20" /></td>
    <td>14</td><td><img src="http://medyk.org/colors/00ffff.png" width="20" height="20" /></td>
    <td>15</td><td><img src="http://medyk.org/colors/ffffff.png" width="20" height="20" /></td>
  </tr>

  <tr>
    <td>16</td><td><img src="http://medyk.org/colors/000000.png" width="20" height="20" /></td>
    <td>17</td><td><img src="http://medyk.org/colors/00005f.png" width="20" height="20" /></td>
    <td>18</td><td><img src="http://medyk.org/colors/000087.png" width="20" height="20" /></td>
    <td>19</td><td><img src="http://medyk.org/colors/0000af.png" width="20" height="20" /></td>
    <td>20</td><td><img src="http://medyk.org/colors/0000d7.png" width="20" height="20" /></td>
    <td>21</td><td><img src="http://medyk.org/colors/0000ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>22</td><td><img src="http://medyk.org/colors/005f00.png" width="20" height="20" /></td>
    <td>23</td><td><img src="http://medyk.org/colors/005f5f.png" width="20" height="20" /></td>
    <td>24</td><td><img src="http://medyk.org/colors/005f87.png" width="20" height="20" /></td>
    <td>25</td><td><img src="http://medyk.org/colors/005faf.png" width="20" height="20" /></td>
    <td>26</td><td><img src="http://medyk.org/colors/005fd7.png" width="20" height="20" /></td>
    <td>27</td><td><img src="http://medyk.org/colors/005fff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>28</td><td><img src="http://medyk.org/colors/008700.png" width="20" height="20" /></td>
    <td>29</td><td><img src="http://medyk.org/colors/00875f.png" width="20" height="20" /></td>
    <td>30</td><td><img src="http://medyk.org/colors/008787.png" width="20" height="20" /></td>
    <td>31</td><td><img src="http://medyk.org/colors/0087af.png" width="20" height="20" /></td>
    <td>32</td><td><img src="http://medyk.org/colors/0087d7.png" width="20" height="20" /></td>
    <td>33</td><td><img src="http://medyk.org/colors/0087ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>34</td><td><img src="http://medyk.org/colors/00af00.png" width="20" height="20" /></td>
    <td>35</td><td><img src="http://medyk.org/colors/00af5f.png" width="20" height="20" /></td>
    <td>36</td><td><img src="http://medyk.org/colors/00af87.png" width="20" height="20" /></td>
    <td>37</td><td><img src="http://medyk.org/colors/00afaf.png" width="20" height="20" /></td>
    <td>38</td><td><img src="http://medyk.org/colors/00afd7.png" width="20" height="20" /></td>
    <td>39</td><td><img src="http://medyk.org/colors/00afff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>40</td><td><img src="http://medyk.org/colors/00d700.png" width="20" height="20" /></td>
    <td>41</td><td><img src="http://medyk.org/colors/00d75f.png" width="20" height="20" /></td>
    <td>42</td><td><img src="http://medyk.org/colors/00d787.png" width="20" height="20" /></td>
    <td>43</td><td><img src="http://medyk.org/colors/00d7af.png" width="20" height="20" /></td>
    <td>44</td><td><img src="http://medyk.org/colors/00d7d7.png" width="20" height="20" /></td>
    <td>45</td><td><img src="http://medyk.org/colors/00d7ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>46</td><td><img src="http://medyk.org/colors/00ff00.png" width="20" height="20" /></td>
    <td>47</td><td><img src="http://medyk.org/colors/00ff5f.png" width="20" height="20" /></td>
    <td>48</td><td><img src="http://medyk.org/colors/00ff87.png" width="20" height="20" /></td>
    <td>49</td><td><img src="http://medyk.org/colors/00ffaf.png" width="20" height="20" /></td>
    <td>50</td><td><img src="http://medyk.org/colors/00ffd7.png" width="20" height="20" /></td>
    <td>51</td><td><img src="http://medyk.org/colors/00ffff.png" width="20" height="20" /></td>
  </tr>

  <tr>
    <td>52</td><td><img src="http://medyk.org/colors/5f0000.png" width="20" height="20" /></td>
    <td>53</td><td><img src="http://medyk.org/colors/5f005f.png" width="20" height="20" /></td>
    <td>54</td><td><img src="http://medyk.org/colors/5f0087.png" width="20" height="20" /></td>
    <td>55</td><td><img src="http://medyk.org/colors/5f00af.png" width="20" height="20" /></td>
    <td>56</td><td><img src="http://medyk.org/colors/5f00d7.png" width="20" height="20" /></td>
    <td>57</td><td><img src="http://medyk.org/colors/5f00ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>58</td><td><img src="http://medyk.org/colors/5f5f00.png" width="20" height="20" /></td>
    <td>59</td><td><img src="http://medyk.org/colors/5f5f5f.png" width="20" height="20" /></td>
    <td>60</td><td><img src="http://medyk.org/colors/5f5f87.png" width="20" height="20" /></td>
    <td>61</td><td><img src="http://medyk.org/colors/5f5faf.png" width="20" height="20" /></td>
    <td>62</td><td><img src="http://medyk.org/colors/5f5fd7.png" width="20" height="20" /></td>
    <td>63</td><td><img src="http://medyk.org/colors/5f5fff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>64</td><td><img src="http://medyk.org/colors/5f8700.png" width="20" height="20" /></td>
    <td>65</td><td><img src="http://medyk.org/colors/5f875f.png" width="20" height="20" /></td>
    <td>66</td><td><img src="http://medyk.org/colors/5f8787.png" width="20" height="20" /></td>
    <td>67</td><td><img src="http://medyk.org/colors/5f87af.png" width="20" height="20" /></td>
    <td>68</td><td><img src="http://medyk.org/colors/5f87d7.png" width="20" height="20" /></td>
    <td>69</td><td><img src="http://medyk.org/colors/5f87ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>70</td><td><img src="http://medyk.org/colors/5faf00.png" width="20" height="20" /></td>
    <td>71</td><td><img src="http://medyk.org/colors/5faf5f.png" width="20" height="20" /></td>
    <td>72</td><td><img src="http://medyk.org/colors/5faf87.png" width="20" height="20" /></td>
    <td>73</td><td><img src="http://medyk.org/colors/5fafaf.png" width="20" height="20" /></td>
    <td>74</td><td><img src="http://medyk.org/colors/5fafd7.png" width="20" height="20" /></td>
    <td>75</td><td><img src="http://medyk.org/colors/5fafff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>76</td><td><img src="http://medyk.org/colors/5fd700.png" width="20" height="20" /></td>
    <td>77</td><td><img src="http://medyk.org/colors/5fd75f.png" width="20" height="20" /></td>
    <td>78</td><td><img src="http://medyk.org/colors/5fd787.png" width="20" height="20" /></td>
    <td>79</td><td><img src="http://medyk.org/colors/5fd7af.png" width="20" height="20" /></td>
    <td>80</td><td><img src="http://medyk.org/colors/5fd7d7.png" width="20" height="20" /></td>
    <td>81</td><td><img src="http://medyk.org/colors/5fd7ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>82</td><td><img src="http://medyk.org/colors/5fff00.png" width="20" height="20" /></td>
    <td>83</td><td><img src="http://medyk.org/colors/5fff5f.png" width="20" height="20" /></td>
    <td>84</td><td><img src="http://medyk.org/colors/5fff87.png" width="20" height="20" /></td>
    <td>85</td><td><img src="http://medyk.org/colors/5fffaf.png" width="20" height="20" /></td>
    <td>86</td><td><img src="http://medyk.org/colors/5fffd7.png" width="20" height="20" /></td>
    <td>87</td><td><img src="http://medyk.org/colors/5fffff.png" width="20" height="20" /></td>
  </tr>

  <tr>
    <td>88</td><td><img src="http://medyk.org/colors/870000.png" width="20" height="20" /></td>
    <td>89</td><td><img src="http://medyk.org/colors/87005f.png" width="20" height="20" /></td>
    <td>90</td><td><img src="http://medyk.org/colors/870087.png" width="20" height="20" /></td>
    <td>91</td><td><img src="http://medyk.org/colors/8700af.png" width="20" height="20" /></td>
    <td>92</td><td><img src="http://medyk.org/colors/8700d7.png" width="20" height="20" /></td>
    <td>93</td><td><img src="http://medyk.org/colors/8700ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>94</td><td><img src="http://medyk.org/colors/875f00.png" width="20" height="20" /></td>
    <td>95</td><td><img src="http://medyk.org/colors/875f5f.png" width="20" height="20" /></td>
    <td>96</td><td><img src="http://medyk.org/colors/875f87.png" width="20" height="20" /></td>
    <td>97</td><td><img src="http://medyk.org/colors/875faf.png" width="20" height="20" /></td>
    <td>98</td><td><img src="http://medyk.org/colors/875fd7.png" width="20" height="20" /></td>
    <td>99</td><td><img src="http://medyk.org/colors/875fff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>100</td><td><img src="http://medyk.org/colors/878700.png" width="20" height="20" /></td>
    <td>101</td><td><img src="http://medyk.org/colors/87875f.png" width="20" height="20" /></td>
    <td>102</td><td><img src="http://medyk.org/colors/878787.png" width="20" height="20" /></td>
    <td>103</td><td><img src="http://medyk.org/colors/8787af.png" width="20" height="20" /></td>
    <td>104</td><td><img src="http://medyk.org/colors/8787d7.png" width="20" height="20" /></td>
    <td>105</td><td><img src="http://medyk.org/colors/8787ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>106</td><td><img src="http://medyk.org/colors/87af00.png" width="20" height="20" /></td>
    <td>107</td><td><img src="http://medyk.org/colors/87af5f.png" width="20" height="20" /></td>
    <td>108</td><td><img src="http://medyk.org/colors/87af87.png" width="20" height="20" /></td>
    <td>109</td><td><img src="http://medyk.org/colors/87afaf.png" width="20" height="20" /></td>
    <td>110</td><td><img src="http://medyk.org/colors/87afd7.png" width="20" height="20" /></td>
    <td>111</td><td><img src="http://medyk.org/colors/87afff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>112</td><td><img src="http://medyk.org/colors/87d700.png" width="20" height="20" /></td>
    <td>113</td><td><img src="http://medyk.org/colors/87d75f.png" width="20" height="20" /></td>
    <td>114</td><td><img src="http://medyk.org/colors/87d787.png" width="20" height="20" /></td>
    <td>115</td><td><img src="http://medyk.org/colors/87d7af.png" width="20" height="20" /></td>
    <td>116</td><td><img src="http://medyk.org/colors/87d7d7.png" width="20" height="20" /></td>
    <td>117</td><td><img src="http://medyk.org/colors/87d7ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>118</td><td><img src="http://medyk.org/colors/87ff00.png" width="20" height="20" /></td>
    <td>119</td><td><img src="http://medyk.org/colors/87ff5f.png" width="20" height="20" /></td>
    <td>120</td><td><img src="http://medyk.org/colors/87ff87.png" width="20" height="20" /></td>
    <td>121</td><td><img src="http://medyk.org/colors/87ffaf.png" width="20" height="20" /></td>
    <td>122</td><td><img src="http://medyk.org/colors/87ffd7.png" width="20" height="20" /></td>
    <td>123</td><td><img src="http://medyk.org/colors/87ffff.png" width="20" height="20" /></td>
  </tr>

  <tr>
    <td>124</td><td><img src="http://medyk.org/colors/af0000.png" width="20" height="20" /></td>
    <td>125</td><td><img src="http://medyk.org/colors/af005f.png" width="20" height="20" /></td>
    <td>126</td><td><img src="http://medyk.org/colors/af0087.png" width="20" height="20" /></td>
    <td>127</td><td><img src="http://medyk.org/colors/af00af.png" width="20" height="20" /></td>
    <td>128</td><td><img src="http://medyk.org/colors/af00d7.png" width="20" height="20" /></td>
    <td>129</td><td><img src="http://medyk.org/colors/af00ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>130</td><td><img src="http://medyk.org/colors/af5f00.png" width="20" height="20" /></td>
    <td>131</td><td><img src="http://medyk.org/colors/af5f5f.png" width="20" height="20" /></td>
    <td>132</td><td><img src="http://medyk.org/colors/af5f87.png" width="20" height="20" /></td>
    <td>133</td><td><img src="http://medyk.org/colors/af5faf.png" width="20" height="20" /></td>
    <td>134</td><td><img src="http://medyk.org/colors/af5fd7.png" width="20" height="20" /></td>
    <td>135</td><td><img src="http://medyk.org/colors/af5fff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>136</td><td><img src="http://medyk.org/colors/af8700.png" width="20" height="20" /></td>
    <td>137</td><td><img src="http://medyk.org/colors/af875f.png" width="20" height="20" /></td>
    <td>138</td><td><img src="http://medyk.org/colors/af8787.png" width="20" height="20" /></td>
    <td>139</td><td><img src="http://medyk.org/colors/af87af.png" width="20" height="20" /></td>
    <td>140</td><td><img src="http://medyk.org/colors/af87d7.png" width="20" height="20" /></td>
    <td>141</td><td><img src="http://medyk.org/colors/af87ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>142</td><td><img src="http://medyk.org/colors/afaf00.png" width="20" height="20" /></td>
    <td>143</td><td><img src="http://medyk.org/colors/afaf5f.png" width="20" height="20" /></td>
    <td>144</td><td><img src="http://medyk.org/colors/afaf87.png" width="20" height="20" /></td>
    <td>145</td><td><img src="http://medyk.org/colors/afafaf.png" width="20" height="20" /></td>
    <td>146</td><td><img src="http://medyk.org/colors/afafd7.png" width="20" height="20" /></td>
    <td>147</td><td><img src="http://medyk.org/colors/afafff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>148</td><td><img src="http://medyk.org/colors/afd700.png" width="20" height="20" /></td>
    <td>149</td><td><img src="http://medyk.org/colors/afd75f.png" width="20" height="20" /></td>
    <td>150</td><td><img src="http://medyk.org/colors/afd787.png" width="20" height="20" /></td>
    <td>151</td><td><img src="http://medyk.org/colors/afd7af.png" width="20" height="20" /></td>
    <td>152</td><td><img src="http://medyk.org/colors/afd7d7.png" width="20" height="20" /></td>
    <td>153</td><td><img src="http://medyk.org/colors/afd7ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>154</td><td><img src="http://medyk.org/colors/afff00.png" width="20" height="20" /></td>
    <td>155</td><td><img src="http://medyk.org/colors/afff5f.png" width="20" height="20" /></td>
    <td>156</td><td><img src="http://medyk.org/colors/afff87.png" width="20" height="20" /></td>
    <td>157</td><td><img src="http://medyk.org/colors/afffaf.png" width="20" height="20" /></td>
    <td>158</td><td><img src="http://medyk.org/colors/afffd7.png" width="20" height="20" /></td>
    <td>159</td><td><img src="http://medyk.org/colors/afffff.png" width="20" height="20" /></td>
  </tr>

  <tr>
    <td>160</td><td><img src="http://medyk.org/colors/d70000.png" width="20" height="20" /></td>
    <td>161</td><td><img src="http://medyk.org/colors/d7005f.png" width="20" height="20" /></td>
    <td>162</td><td><img src="http://medyk.org/colors/d70087.png" width="20" height="20" /></td>
    <td>163</td><td><img src="http://medyk.org/colors/d700af.png" width="20" height="20" /></td>
    <td>164</td><td><img src="http://medyk.org/colors/d700d7.png" width="20" height="20" /></td>
    <td>165</td><td><img src="http://medyk.org/colors/d700ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>166</td><td><img src="http://medyk.org/colors/d75f00.png" width="20" height="20" /></td>
    <td>167</td><td><img src="http://medyk.org/colors/d75f5f.png" width="20" height="20" /></td>
    <td>168</td><td><img src="http://medyk.org/colors/d75f87.png" width="20" height="20" /></td>
    <td>169</td><td><img src="http://medyk.org/colors/d75faf.png" width="20" height="20" /></td>
    <td>170</td><td><img src="http://medyk.org/colors/d75fd7.png" width="20" height="20" /></td>
    <td>171</td><td><img src="http://medyk.org/colors/d75fff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>172</td><td><img src="http://medyk.org/colors/d78700.png" width="20" height="20" /></td>
    <td>173</td><td><img src="http://medyk.org/colors/d7875f.png" width="20" height="20" /></td>
    <td>174</td><td><img src="http://medyk.org/colors/d78787.png" width="20" height="20" /></td>
    <td>175</td><td><img src="http://medyk.org/colors/d787af.png" width="20" height="20" /></td>
    <td>176</td><td><img src="http://medyk.org/colors/d787d7.png" width="20" height="20" /></td>
    <td>177</td><td><img src="http://medyk.org/colors/d787ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>178</td><td><img src="http://medyk.org/colors/d7af00.png" width="20" height="20" /></td>
    <td>179</td><td><img src="http://medyk.org/colors/d7af5f.png" width="20" height="20" /></td>
    <td>180</td><td><img src="http://medyk.org/colors/d7af87.png" width="20" height="20" /></td>
    <td>181</td><td><img src="http://medyk.org/colors/d7afaf.png" width="20" height="20" /></td>
    <td>182</td><td><img src="http://medyk.org/colors/d7afd7.png" width="20" height="20" /></td>
    <td>183</td><td><img src="http://medyk.org/colors/d7afff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>184</td><td><img src="http://medyk.org/colors/d7d700.png" width="20" height="20" /></td>
    <td>185</td><td><img src="http://medyk.org/colors/d7d75f.png" width="20" height="20" /></td>
    <td>186</td><td><img src="http://medyk.org/colors/d7d787.png" width="20" height="20" /></td>
    <td>187</td><td><img src="http://medyk.org/colors/d7d7af.png" width="20" height="20" /></td>
    <td>188</td><td><img src="http://medyk.org/colors/d7d7d7.png" width="20" height="20" /></td>
    <td>189</td><td><img src="http://medyk.org/colors/d7d7ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>190</td><td><img src="http://medyk.org/colors/d7ff00.png" width="20" height="20" /></td>
    <td>191</td><td><img src="http://medyk.org/colors/d7ff5f.png" width="20" height="20" /></td>
    <td>192</td><td><img src="http://medyk.org/colors/d7ff87.png" width="20" height="20" /></td>
    <td>193</td><td><img src="http://medyk.org/colors/d7ffaf.png" width="20" height="20" /></td>
    <td>194</td><td><img src="http://medyk.org/colors/d7ffd7.png" width="20" height="20" /></td>
    <td>195</td><td><img src="http://medyk.org/colors/d7ffff.png" width="20" height="20" /></td>
  </tr>

  <tr>
    <td>196</td><td><img src="http://medyk.org/colors/ff0000.png" width="20" height="20" /></td>
    <td>197</td><td><img src="http://medyk.org/colors/ff005f.png" width="20" height="20" /></td>
    <td>198</td><td><img src="http://medyk.org/colors/ff0087.png" width="20" height="20" /></td>
    <td>199</td><td><img src="http://medyk.org/colors/ff00af.png" width="20" height="20" /></td>
    <td>200</td><td><img src="http://medyk.org/colors/ff00d7.png" width="20" height="20" /></td>
    <td>201</td><td><img src="http://medyk.org/colors/ff00ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>202</td><td><img src="http://medyk.org/colors/ff5f00.png" width="20" height="20" /></td>
    <td>203</td><td><img src="http://medyk.org/colors/ff5f5f.png" width="20" height="20" /></td>
    <td>204</td><td><img src="http://medyk.org/colors/ff5f87.png" width="20" height="20" /></td>
    <td>205</td><td><img src="http://medyk.org/colors/ff5faf.png" width="20" height="20" /></td>
    <td>206</td><td><img src="http://medyk.org/colors/ff5fd7.png" width="20" height="20" /></td>
    <td>207</td><td><img src="http://medyk.org/colors/ff5fff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>208</td><td><img src="http://medyk.org/colors/ff8700.png" width="20" height="20" /></td>
    <td>209</td><td><img src="http://medyk.org/colors/ff875f.png" width="20" height="20" /></td>
    <td>210</td><td><img src="http://medyk.org/colors/ff8787.png" width="20" height="20" /></td>
    <td>211</td><td><img src="http://medyk.org/colors/ff87af.png" width="20" height="20" /></td>
    <td>212</td><td><img src="http://medyk.org/colors/ff87d7.png" width="20" height="20" /></td>
    <td>213</td><td><img src="http://medyk.org/colors/ff87ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>214</td><td><img src="http://medyk.org/colors/ffaf00.png" width="20" height="20" /></td>
    <td>215</td><td><img src="http://medyk.org/colors/ffaf5f.png" width="20" height="20" /></td>
    <td>216</td><td><img src="http://medyk.org/colors/ffaf87.png" width="20" height="20" /></td>
    <td>217</td><td><img src="http://medyk.org/colors/ffafaf.png" width="20" height="20" /></td>
    <td>218</td><td><img src="http://medyk.org/colors/ffafd7.png" width="20" height="20" /></td>
    <td>219</td><td><img src="http://medyk.org/colors/ffafff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>220</td><td><img src="http://medyk.org/colors/ffd700.png" width="20" height="20" /></td>
    <td>221</td><td><img src="http://medyk.org/colors/ffd75f.png" width="20" height="20" /></td>
    <td>222</td><td><img src="http://medyk.org/colors/ffd787.png" width="20" height="20" /></td>
    <td>223</td><td><img src="http://medyk.org/colors/ffd7af.png" width="20" height="20" /></td>
    <td>224</td><td><img src="http://medyk.org/colors/ffd7d7.png" width="20" height="20" /></td>
    <td>225</td><td><img src="http://medyk.org/colors/ffd7ff.png" width="20" height="20" /></td>
  </tr>
  <tr>
    <td>226</td><td><img src="http://medyk.org/colors/ffff00.png" width="20" height="20" /></td>
    <td>227</td><td><img src="http://medyk.org/colors/ffff5f.png" width="20" height="20" /></td>
    <td>228</td><td><img src="http://medyk.org/colors/ffff87.png" width="20" height="20" /></td>
    <td>229</td><td><img src="http://medyk.org/colors/ffffaf.png" width="20" height="20" /></td>
    <td>230</td><td><img src="http://medyk.org/colors/ffffd7.png" width="20" height="20" /></td>
    <td>231</td><td><img src="http://medyk.org/colors/ffffff.png" width="20" height="20" /></td>
  </tr>
</table>