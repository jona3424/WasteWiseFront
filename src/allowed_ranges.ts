export interface Range {
	min?: number;
	max?: number;
}

export const bitne_metrike:string[] = [
	"ph",
	"temperature"
]	

export default {
	"ph": {
		min: 6.5,
		max: 8.5
	},
	"speed": {
	},
	"temperature": {},
	"oxygen": {},
	"orv": {
		min: 300,
		max: 500
	},
	"conductivity": {
		min: 0,
		max: 1000
	},
	"salinity": {
		max: 600
	},
	"tds": {
		min: 150,
		max: 250
	},
	"turbidity": {
		max: 1
	},
	"tss": {
		max: 30
	},
	"ammonia": {
		max: 0.5
	},
	"nitrate": {
		max: 10
	},
	"chloride": {
		max: 250
	},
	"sodium": {
		max: 60
	},
	"calcium": {
		max: 300
	},
	"bga": {
		max: 30
	}
} as { [name: string]: Range };