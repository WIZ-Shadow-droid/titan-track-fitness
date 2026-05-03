import React, { useState } from 'react';
import { foodDB } from '../data/foodDB';

function MealPlanSection() {
  const [formData, setFormData] = useState({ weight: 80, height: 175, age: 25, gender: 'male' });
  const [goal, setGoal] = useState('cutting');
  const [mealPlan, setMealPlan] = useState(null);
  const [nutrition, setNutrition] = useState(null);

  const calculateNutrition = () => {
    const { weight, height, age, gender } = formData;
    let bmr = gender === 'male' ? (10 * weight) + (6.25 * height) - (5 * age) + 5 : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    const tdee = bmr * 1.55;
    let targetCal = goal === 'cutting' ? tdee - 500 : goal === 'bulking' ? tdee + 500 : tdee;
    let proteinG, fatG;
    if (goal === 'cutting') { proteinG = Math.round(weight * 2.2); fatG = Math.round(weight * 0.8); }
    else if (goal === 'bulking') { proteinG = Math.round(weight * 2.0); fatG = Math.round(weight * 1.0); }
    else { proteinG = Math.round(weight * 1.8); fatG = Math.round(weight * 0.9); }
    const carbG = Math.round((targetCal - (proteinG * 4) - (fatG * 9)) / 4);
    return { bmr: Math.round(bmr), tdee: Math.round(tdee), targetCal: Math.round(targetCal), proteinG, carbG: Math.max(50, carbG), fatG: Math.max(30, fatG), goal };
  };

  const generateMeals = (nutrition) => {
    const mealsPerDay = 4;
    const mealNames = ['Breakfast (7:00 AM)', 'Lunch (12:30 PM)', 'Snack (4:00 PM)', 'Dinner (7:30 PM)'];
    return mealNames.map((mealName, idx) => {
      const items = [];
      if (idx === 0) {
        items.push({ ...foodDB.proteins[nutrition.goal === 'cutting' ? 5 : 4] }, { ...foodDB.carbs[3] });
      } else if (idx === 2) {
        items.push({ ...foodDB.proteins[nutrition.goal === 'cutting' ? 6 : 7] }, { ...foodDB.carbs[5] });
      } else {
        const pool = nutrition.goal === 'cutting' ? [0, 1, 8] : [0, 1, 2, 3, 8];
        items.push({ ...foodDB.proteins[pool[Math.floor(Math.random() * pool.length)]] }, { ...foodDB.carbs[Math.floor(Math.random() * foodDB.carbs.length)] });
      }
      items.push({ ...foodDB.veggies[Math.floor(Math.random() * foodDB.veggies.length)] });
      if (idx === 1 || idx === 3) items.push({ ...foodDB.fats[nutrition.goal === 'cutting' ? 2 : Math.floor(Math.random() * foodDB.fats.length)] });
      let tp = 0, tc = 0, tf = 0, tcal = 0;
      items.forEach(i => { tp += i.protein; tc += i.carbs; tf += i.fats; tcal += i.cal; });
      return { type: mealName, items: items.map(i => ({ name: i.name, description: i.unit, protein: i.protein, carbs: i.carbs, fats: i.fats, cal: i.cal })), mealProtein: Math.round(tp), mealCarbs: Math.round(tc), mealFats: Math.round(tf), mealCal: Math.round(tcal) };
    });
  };

  const handleGenerate = () => {
    const nut = calculateNutrition();
    setNutrition(nut);
    setMealPlan(generateMeals(nut));
  };

  const updateField = (field) => (e) => setFormData({ ...formData, [field]: parseFloat(e.target.value) || 0 });

  return (
    <>
      <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.8rem', marginBottom: '1rem' }}>NUTRITION <span style={{ color: 'var(--orange-accent)' }}>CALCULATOR</span></h3>
      <div className="meal-calc-form">
        <div className="calc-row">
          <div className="form-group">
            <label className="form-label">Weight (kg)</label>
            <input type="number" value={formData.weight} onChange={updateField('weight')} min="30" max="300" />
          </div>
          <div className="form-group">
            <label className="form-label">Height (cm)</label>
            <input type="number" value={formData.height} onChange={updateField('height')} min="100" max="250" />
          </div>
          <div className="form-group">
            <label className="form-label">Age</label>
            <input type="number" value={formData.age} onChange={updateField('age')} min="15" max="80" />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="goal-selector">
          {['cutting', 'maintenance', 'bulking'].map((g) => (
            <button key={g} className={`goal-btn ${goal === g ? 'active' : ''}`} onClick={() => setGoal(g)}>
              {g === 'cutting' && '🔥 CUTTING (-500 cal)'}
              {g === 'maintenance' && '⚖️ MAINTENANCE'}
              {g === 'bulking' && '💪 BULKING (+500 cal)'}
            </button>
          ))}
        </div>
        <button className="btn btn-full" onClick={handleGenerate}>🍽️ GENERATE MY MEAL PLAN</button>

        {nutrition && (
          <div className="nutrition-summary">
            <div className="nutrition-stat"><div className="value">{nutrition.bmr}</div><div>BMR (cal)</div></div>
            <div className="nutrition-stat"><div className="value">{nutrition.tdee}</div><div>TDEE (cal)</div></div>
            <div className="nutrition-stat"><div className="value" style={{ color: 'var(--orange-accent)' }}>{nutrition.targetCal}</div><div>Target (cal)</div></div>
            <div className="nutrition-stat"><div className="value" style={{ color: '#ffd700' }}>{nutrition.proteinG}g</div><div>Protein</div></div>
          </div>
        )}
      </div>

      {mealPlan && (
        <div>
          {mealPlan.map((meal, i) => (
            <div key={i} className="meal-day-card">
              <div className="meal-header">
                <span className="meal-type">{meal.type}</span>
                <div className="macro-badges">
                  <span className="macro-badge protein">P:{meal.mealProtein}g</span>
                  <span className="macro-badge carbs">C:{meal.mealCarbs}g</span>
                  <span className="macro-badge fats">F:{meal.mealFats}g</span>
                  <span style={{ color: '#aaa', fontSize: '0.7rem' }}>{meal.mealCal}cal</span>
                </div>
              </div>
              <div className="meal-items">
                {meal.items.map((item, j) => (
                  <div key={j} className="meal-item">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className="macro-badges" style={{ marginTop: '0.4rem' }}>
                      <span className="macro-badge protein">P:{item.protein}g</span>
                      <span className="macro-badge carbs">C:{item.carbs}g</span>
                      <span className="macro-badge fats">F:{item.fats}g</span>
                      <span style={{ color: '#aaa', fontSize: '0.7rem' }}>{item.cal}cal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="nutrition-summary">
            <div className="nutrition-stat"><div className="value">{mealPlan.reduce((s, m) => s + m.mealCal, 0)}</div><div>Daily Calories</div><div className="result-label">{nutrition.goal.toUpperCase()}</div></div>
            <div className="nutrition-stat"><div className="value" style={{ color: '#ff6b35' }}>{mealPlan.reduce((s, m) => s + m.mealProtein, 0)}g</div><div>Protein</div></div>
            <div className="nutrition-stat"><div className="value" style={{ color: '#ffd700' }}>{mealPlan.reduce((s, m) => s + m.mealCarbs, 0)}g</div><div>Carbs</div></div>
            <div className="nutrition-stat"><div className="value" style={{ color: '#4ecdc4' }}>{mealPlan.reduce((s, m) => s + m.mealFats, 0)}g</div><div>Fats</div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default MealPlanSection;