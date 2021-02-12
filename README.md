## postprocessing SVG

- save as SVG
- before **<g>** tag add:

```
<defs>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Comfortaa');
	</style>
</defs>
```

- replace all occurences: **Comfortaa-Regular** for **Comfortaa**
- replace all occurences: **ﬁ** ( copy it from here !!) for **fi**